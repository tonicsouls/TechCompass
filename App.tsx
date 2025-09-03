
import React, { useState, useCallback, useEffect, useRef } from 'react';
import TroubleshootScreen from './components/TroubleshootScreen';
import Tech101Screen from './components/Tech101Screen';
import { startChatSession, sendMessage } from './services/geminiService';
import { AppState, ChatMessage, AppView } from './types';
import { CompassIcon } from './components/icons/CompassIcon';
import type { Chat } from '@google/genai';

const SEND_MESSAGE_TIMEOUT_MS = 45000;

// Small helper: promise with timeout
async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms);
    p.then(v => { clearTimeout(id); resolve(v); })
     .catch(e => { clearTimeout(id); reject(e); });
  });
}

// Scale large captures to ~1280px max width to cut payload size
function captureFromVideo(video: HTMLVideoElement, maxW = 1280): string | null {
  if (!video.videoWidth || !video.videoHeight) return null;
  const scale = Math.min(1, maxW / video.videoWidth);
  const w = Math.floor(video.videoWidth * scale);
  const h = Math.floor(video.videoHeight * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(video, 0, 0, w, h);
  // Remove prefix to send raw base64
  return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
}

// Fix: Add type assertion to access non-standard window properties
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechSupported = !!SpeechRecognition;

const App: React.FC = () => {
  const [appView, setAppView] = useState<AppView>(AppView.TROUBLESHOOTER);
  const [troubleshootState, setTroubleshootState] = useState<AppState>(AppState.IDLE);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Announce changes for accessibility
  const announce = useCallback((msg: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
      requestAnimationFrame(() => { if (liveRegionRef.current) liveRegionRef.current.textContent = msg; });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (stream) {
      video.srcObject = stream;
      const onLoaded = () => announce('Screen sharing started.');
      video.addEventListener('loadedmetadata', onLoaded);
      video.play().catch(() => {});
      return () => {
        video.removeEventListener('loadedmetadata', onLoaded);
        video.srcObject = null;
      };
    } else {
      video.srcObject = null;
    }
  }, [stream, announce]);

  useEffect(() => {
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [stream]);
  
  const stopScreenShare = useCallback(() => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    announce('Screen sharing stopped.');
  }, [stream, announce]);

  const handleGoHome = useCallback(() => {
    stopScreenShare();
    setAppView(AppView.TROUBLESHOOTER);
    setTroubleshootState(AppState.IDLE);
    setTranscript([]);
    setChatSession(null);
    setError(null);
    announce('Session ended. Returned to home screen.');
  }, [stopScreenShare, announce]);


  const startScreenShare = useCallback(async (): Promise<MediaStream | null> => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' as any, frameRate: 10 },
        audio: false
      });
      setStream(displayStream);
      setError(null);
      return displayStream;
    } catch (err) {
      console.error('Error starting screen share:', err);
      setError('Screen sharing was blocked or failed. You can continue with a text-only chat.');
      announce('Screen sharing blocked.');
      return null;
    }
  }, [announce]);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current) return null;
    return captureFromVideo(videoRef.current);
  }, []);

  const handleSendMessage = useCallback(async (text: string, imageBase64: string | null) => {
    if (isBusy) return;
    
    let session = chatSession;
    if (!session) {
      session = startChatSession();
      setChatSession(session);
    }
    
    setIsBusy(true);
    setError(null);
    setTroubleshootState(AppState.ANALYZING);

    const userMessage: ChatMessage = { role: 'user', text, imageBase64 };
    setTranscript(prev => [...prev, userMessage]);
    announce(`Sent message: ${text}`);
    
    try {
      const modelResponse = await withTimeout(
          sendMessage(session, text, imageBase64), 
          SEND_MESSAGE_TIMEOUT_MS
      );
      setTranscript(prev => [...prev, modelResponse]);
      announce(`Received response.`);
    } catch (apiError) {
      console.error('Gemini error:', apiError);
      let errorMessage = 'The assistant is having trouble responding. Please try again in a moment.';

      if (apiError instanceof Error) {
        if (apiError.message === 'timeout') {
          errorMessage = 'The assistant is taking too long to respond. Please try again.';
        } else if (apiError.message.includes('PERMISSION_DENIED') || apiError.message.includes('403')) {
          errorMessage = 'Could not connect to the AI assistant. There might be an issue with the application configuration (Permission Denied).';
        }
      }
      
      setError(errorMessage);
      const errorResponseMessage: ChatMessage = { role: 'model', text: `Sorry, I encountered an error. ${errorMessage}` };
      setTranscript(prev => [...prev, errorResponseMessage]);
      setTroubleshootState(AppState.ERROR);
    } finally {
      if (troubleshootState !== AppState.ERROR) {
        setTroubleshootState(AppState.TROUBLESHOOTING);
      }
      setIsBusy(false);
    }
  }, [isBusy, chatSession, announce, troubleshootState]);

  const handleStartTroubleshooting = useCallback(async (description: string) => {
    setAppView(AppView.TROUBLESHOOTER);
    setTroubleshootState(AppState.ANALYZING);
    setTranscript([]);
    setError(null);
    announce('Starting new troubleshooting session.');
    handleSendMessage(description, null);
  }, [handleSendMessage, announce]);
  
  // --- Speech Recognition Logic ---
  const handleListen = useCallback((setTextCallback: (text: string) => void) => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    if (!isSpeechSupported) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
    };
    recognition.onresult = (event: any) => {
        const newText = event.results[0][0].transcript;
        setTextCallback(newText);
    };
    
    recognition.start();

  }, [isListening]);


  const renderContent = () => {
    switch (appView) {
      case AppView.TECH101:
        return <Tech101Screen />;
      case AppView.TROUBLESHOOTER:
      default:
        return (
          <TroubleshootScreen
            appState={troubleshootState}
            transcript={transcript}
            error={error}
            clearError={() => setError(null)}
            onSendMessage={handleSendMessage}
            onStartSession={handleStartTroubleshooting}
            onEndSession={handleGoHome}
            onStartScreenShare={startScreenShare}
            onCaptureFrame={captureFrame}
            isSpeechSupported={isSpeechSupported}
            isListening={isListening}
            onListen={handleListen}
            onNavigateToGuides={() => setAppView(AppView.TECH101)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <header className="bg-white/80 shadow-sm sticky top-0 z-20 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleGoHome} className="flex items-center gap-3" aria-label="Go to Home Screen">
            <CompassIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Tech Compass
              </h1>
              <p className="text-xs text-gray-500">Your AI Ally</p>
            </div>
          </button>
        </div>
      </header>

      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <main className="container mx-auto p-4 md:p-8 flex-grow flex flex-col">
         {renderContent()}
      </main>

      <video ref={videoRef} autoPlay playsInline muted style={{ display: 'none' }} />
    </div>
  );
};

export default App;
