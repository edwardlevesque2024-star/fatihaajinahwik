export enum JournalStyle {
  VINTAGE = 'Vintage',
  BOTANICAL = 'Botanical',
  GRUNGE = 'Grunge',
  STEAMPUNK = 'Steampunk',
  PASTEL = 'Pastel Cute',
  GOTHIC = 'Dark Gothic',
  EPHEMERA = 'Ephemera Collage'
}

export interface GeneratorSettings {
  topic: string;
  style: JournalStyle;
  count: number;
  enhancePrompts: boolean;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: number;
  status: 'loading' | 'success' | 'error';
}

export interface GenerationResponse {
  prompts: string[];
}
