export enum AppView {
  TROUBLESHOOTER = 'troubleshooter',
  TECH101 = 'tech101',
}

export enum AppState {
  IDLE = 'idle',
  ANALYZING = 'analyzing',
  TROUBLESHOOTING = 'troubleshooting',
  ERROR = 'error',
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageBase64?: string | null;
  sources?: GroundingSource[];
  suggestions?: string[];
}
