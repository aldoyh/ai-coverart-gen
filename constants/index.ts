import { AspectRatio, StylePreset } from '../types';

export const ASPECT_RATIOS: AspectRatio[] = [
  { value: '16:9', label: 'Landscape (16:9)', width: 16, height: 9 },
  { value: '1:1', label: 'Square (1:1)', width: 1, height: 1 },
  { value: '9:16', label: 'Portrait (9:16)', width: 9, height: 16 },
  { value: '4:3', label: 'Classic (4:3)', width: 4, height: 3 },
  { value: '21:9', label: 'Ultrawide (21:9)', width: 21, height: 9 },
];

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Epic, movie-like quality with dramatic lighting',
    prompt: 'Create cinematic, high-quality cover art with dramatic lighting, epic atmosphere, highly detailed, with vibrant colors and professional graphic design elements. Movie poster style.',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple, modern design',
    prompt: 'Create minimalist, clean cover art with simple geometric shapes, modern design, minimal color palette, elegant and professional. Focus on simplicity and negative space.',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'Bold, colorful, and energetic',
    prompt: 'Create vibrant, colorful cover art with bold colors, energetic composition, dynamic elements, eye-catching design, and modern aesthetic. Use bright, saturated colors.',
  },
  {
    id: 'dark',
    name: 'Dark & Moody',
    description: 'Mysterious, dramatic, dark aesthetic',
    prompt: 'Create dark and moody cover art with mysterious atmosphere, dramatic shadows, noir aesthetic, high contrast, cinematic darkness, and sophisticated design.',
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Vintage 80s/90s inspired design',
    prompt: 'Create retro-style cover art inspired by 1980s and 1990s aesthetics, vintage colors, nostalgic vibe, retro-futuristic elements, synthwave or vaporwave inspired.',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Artistic, non-representational forms',
    prompt: 'Create abstract cover art with artistic non-representational forms, creative patterns, unique compositions, modern art style, experimental design.',
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Realistic, photograph-like quality',
    prompt: 'Create photorealistic cover art that looks like a professional photograph, highly detailed, realistic textures, natural lighting, lifelike quality.',
  },
  {
    id: 'illustrated',
    name: 'Illustrated',
    description: 'Hand-drawn, artistic illustration style',
    prompt: 'Create illustrated cover art with hand-drawn artistic style, illustration techniques, painterly quality, artistic brushwork, creative interpretation.',
  },
];

export const KEYBOARD_SHORTCUTS = {
  GENERATE: { key: 'Enter', ctrlKey: true },
  DOWNLOAD: { key: 'd', ctrlKey: true },
  COPY: { key: 'c', ctrlKey: true, shiftKey: true },
  CLEAR: { key: 'k', ctrlKey: true },
};

export const LOCAL_STORAGE_KEYS = {
  IMAGE_HISTORY: 'coverart_image_history',
  LAST_ASPECT_RATIO: 'coverart_last_aspect_ratio',
  LAST_STYLE: 'coverart_last_style',
};
