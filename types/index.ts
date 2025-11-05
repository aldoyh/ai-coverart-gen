export interface AspectRatio {
  value: string;
  label: string;
  width?: number;
  height?: number;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon?: string;
}

export interface GeneratedImage {
  id: string;
  title: string;
  imageUrl: string;
  aspectRatio: string;
  style: string;
  timestamp: number;
}

export interface ImageGenerationConfig {
  title: string;
  aspectRatio: string;
  style: StylePreset;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
