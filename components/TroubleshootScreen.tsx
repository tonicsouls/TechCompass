
import React, { useState, useEffect, useRef } from 'react';
import { AppState, ChatMessage } from '../types';
import { WifiIcon } from './icons/WifiIcon';
import { PrinterIcon } from './icons/PrinterIcon';
import { FolderIcon } from './icons/FolderIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CameraIcon } from './icons/CameraIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { LinkIcon } from './icons/LinkIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SpeedometerIcon } from './icons/SpeedometerIcon';


interface TroubleshootScreenProps {
  appState: AppState;
  transcript: ChatMessage[];
  error?: string | null;
  clearError: () => void;
  onSendMessage: (text: string, imageBase64: string | null) => void;
  onStartSession: (description: string) => void;
  onEndSession: () => void;
  onStartScreenShare: () => Promise<MediaStream | null>;
  onCaptureFrame: () => string | null;
  isSpeechSupported: boolean;
  isListening: boolean;
  onListen: (callback: (text: string) => void) => void;
  onNavigateToGuides: () => void;
}

const problemCategories = [
    { name: 'Internet / Wi-Fi', icon: WifiIcon },
    { name: 'Printers & Scanners', icon: PrinterIcon },
    { name: 'Files & Documents', icon: FolderIcon },
    { name: 'Slow Computer', icon: SpeedometerIcon },
];

interface ProblemInputProps {
    onStart: (description: string) => void;
    isSpeechSupported: boolean;
    isListening: boolean;
    onListen: (callback: (text: string) => void) => void;
    onNavigateToGuides: () => void;
}


const ProblemInput: React.FC<ProblemInputProps> = ({ onStart, isSpeechSupported, isListening, onListen, onNavigateToGuides }) => {
  const [description, setDescription] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onStart(description.trim());
    }
  };
  
  const handleCategoryClick = (categoryName: string) => {
    onStart(`I'm having a problem with: ${categoryName}`);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <SparklesIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          How can I help you today?
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Get immediate AI assistance or browse our guides.
        </p>

        {!showOtherInput ? (
            <div className="space-y-6">
                 <button
                    onClick={() => setShowOtherInput(true)}
                    className="w-full p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all text-center group shadow-lg"
                >
                    <p className="font-bold text-xl">Describe Your Problem</p>
                    <p className="text-base opacity-90">Click here to start an AI troubleshooting session.</p>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {problemCategories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => handleCategoryClick(cat.name)}
                            className="p-6 bg-gray-50 rounded-lg text-gray-800 hover:bg-blue-100 hover:ring-2 hover:ring-blue-500 transition-all text-center group"
                        >
                            <cat.icon className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                            <p className="font-semibold text-lg">{cat.name}</p>
                        </button>
                    ))}
                </div>

                <div className="relative pt-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-medium text-gray-500">Or</span>
                    </div>
                </div>

                <button
                    onClick={onNavigateToGuides}
                    className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                    Browse Learning Center
                </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="text-left">
                <div className="relative">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-40 p-4 pr-12 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                        placeholder="For example: 'My computer is making a strange noise and running very slow.'"
                        aria-label="Describe your problem"
                    />
                     {isSpeechSupported && (
                        <button
                            type="button"
                            onClick={() => onListen(setDescription)}
                            title="Use voice input"
                            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            <MicrophoneIcon className="w-6 h-6"/>
                        </button>
                    )}
                </div>
                <div className="mt-6 flex gap-4">
                    <button
                        type="button"
                        onClick={() => setShowOtherInput(false)}
                        className="w-full inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!description.trim()}
                        className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Start Troubleshooting
                    </button>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};


const WizardInterface: React.FC<TroubleshootScreenProps> = (props) => {
  const {
    appState, transcript, error, clearError, onSendMessage, onEndSession,
    onStartScreenShare, onCaptureFrame, isSpeechSupported, isListening, onListen
  } = props;

  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);
  
  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => clearError(), 5000);
        return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleAttachScreenshot = async () => {
    const stream = await onStartScreenShare();
    if (!stream) return; // User cancelled or failed
    
    // Give a moment for the share UI to disappear
    setTimeout(() => {
        const frame = onCaptureFrame();
        if (frame) {
            setAttachedImage(frame);
        }
        // Stop the stream after capture
        stream.getTracks().forEach(track => track.stop());
    }, 500);
  };

  const handleSend = (text: string, image: string | null = attachedImage) => {
    if ((!text.trim() && !image) || appState === AppState.ANALYZING) return;
    onSendMessage(text, image);
    setInputText('');
    setAttachedImage(null);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSend(inputText);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      handleSend(suggestion);
  };
  
  const lastModelMessage = [...transcript].reverse().find(m => m.role === 'model');

  return (
    <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900">AI Troubleshooter</h2>
        <button onClick={onEndSession} className="text-sm font-semibold text-blue-600 hover:text-blue-800">End Session</button>
      </div>
      
      {/* Toast Error Notification */}
      {error && <div className="p-4 text-center text-sm bg-red-100 text-red-800">{error}</div>}

      {/* Chat History */}
      <div className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto">
        {transcript.map((msg, index) => (
            msg.role === 'model' ? (
                <div key={index} className="flex items-start gap-4">
                    <SparklesIcon className="w-8 h-8 p-1.5 flex-shrink-0 bg-gray-100 text-blue-500 rounded-full mt-1" />
                    <div className="bg-gray-100 rounded-lg p-4 max-w-lg">
                        <p className="text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                         {msg.sources && (
                            <div className="mt-4 pt-3 border-t border-gray-300">
                                <h4 className="text-xs font-bold mb-1.5 text-gray-600">Sources:</h4>
                                <div className="flex flex-col gap-1.5">
                                    {msg.sources.map((source, i) => (
                                    <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1.5 hover:underline text-blue-600">
                                        <LinkIcon className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{source.title}</span>
                                    </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div key={index} className="flex justify-end">
                    <div className="bg-blue-600 text-white p-4 rounded-lg max-w-lg">
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.imageBase64 && (
                            <img 
                                src={`data:image/jpeg;base64,${msg.imageBase64}`} 
                                alt="User screenshot" 
                                className="mt-3 rounded-md border-2 border-blue-400"
                            />
                        )}
                    </div>
                </div>
            )
        ))}

        {appState === AppState.ANALYZING && (
          <div className="flex items-start gap-4">
            <SparklesIcon className="w-8 h-8 p-1.5 flex-shrink-0 bg-gray-100 text-blue-500 rounded-full" />
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse [animation-delay:0.6s]"></div>
                </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Action Area */}
      <div className="p-6 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="space-y-4">
           {/* Suggested Replies */}
           {lastModelMessage?.suggestions && appState !== AppState.ANALYZING && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {lastModelMessage.suggestions.map(s => (
                       <button
                           key={s}
                           onClick={() => handleSuggestionClick(s)}
                           className="w-full text-base font-semibold p-3 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-500 hover:text-white transition-colors"
                       >
                           {s}
                       </button>
                   ))}
               </div>
           )}

           {/* Custom Input */}
           <div className="pt-2">
                <form onSubmit={handleFormSubmit}>
                    {attachedImage && (
                        <div className="relative w-32 mb-2">
                            <img src={`data:image/jpeg;base64,${attachedImage}`} alt="Attached screenshot preview" className="rounded-md border border-gray-300" />
                            <button onClick={() => setAttachedImage(null)} className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full">
                                <XCircleIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFormSubmit(e); } }}
                          placeholder="Type your response..."
                          rows={1}
                          className="flex-grow p-3 text-base border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 resize-none"
                          aria-label="Chat message input"
                          disabled={appState === AppState.ANALYZING}
                        />
                        {isSpeechSupported && (
                             <button
                                type="button"
                                onClick={() => onListen(setInputText)}
                                title="Use voice input"
                                className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <MicrophoneIcon className="w-6 h-6"/>
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleAttachScreenshot}
                            title="Attach screenshot"
                            className="p-3 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <CameraIcon className="w-6 h-6"/>
                        </button>
                        <button type="submit" className="p-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors" disabled={(!inputText.trim() && !attachedImage) || appState === AppState.ANALYZING}>
                          <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

const TroubleshootScreen: React.FC<TroubleshootScreenProps> = (props) => {
  if (props.appState === AppState.IDLE) {
    return <ProblemInput 
             onStart={props.onStartSession} 
             isSpeechSupported={props.isSpeechSupported}
             isListening={props.isListening}
             onListen={props.onListen}
             onNavigateToGuides={props.onNavigateToGuides}
           />;
  }
  return <WizardInterface {...props} />;
};

export default TroubleshootScreen;
