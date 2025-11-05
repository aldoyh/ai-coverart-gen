<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Cover Art Generator 🎨

A powerful, feature-rich web application that generates stunning AI-powered cover art for YouTube videos, podcasts, and more using Google's Gemini AI (Imagen 4.0).

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Imagen%204.0-orange.svg)](https://ai.google.dev/)

View your app in AI Studio: https://ai.studio/apps/drive/1alEmHhq56FjSwQ7cmgUZw4wbsTg0FcZC

## ✨ Features

### 🎯 Core Features
- **AI-Powered Generation**: Leverages Google's Gemini AI (Imagen 4.0) for high-quality image generation
- **Multiple Style Presets**: 8 unique artistic styles to choose from:
  - Cinematic (epic, movie-like quality)
  - Minimalist (clean, modern design)
  - Vibrant (bold, colorful)
  - Dark & Moody (mysterious, dramatic)
  - Retro (80s/90s inspired)
  - Abstract (artistic, non-representational)
  - Photorealistic (photograph-like quality)
  - Illustrated (hand-drawn style)

### 📐 Aspect Ratios
Support for 5 different aspect ratios:
- **16:9** - Landscape (YouTube thumbnails)
- **1:1** - Square (Instagram, social media)
- **9:16** - Portrait (TikTok, Stories)
- **4:3** - Classic (presentations)
- **21:9** - Ultrawide (cinematic)

### 🚀 Advanced Features
- **Image History**: Automatically saves your last 20 generations with local storage
- **Copy to Clipboard**: One-click copy of generated images
- **Share Functionality**: Native share API support for easy sharing
- **Keyboard Shortcuts**:
  - `Ctrl+Enter` - Generate art
  - `Ctrl+D` - Download image
  - `Ctrl+Shift+C` - Copy to clipboard
- **Toast Notifications**: User-friendly feedback for all actions
- **Retry Mechanism**: Automatic retry with exponential backoff for failed requests
- **Responsive Design**: Fully responsive UI that works on all devices
- **Performance Optimized**: React.memo, useMemo, and useCallback for optimal performance

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini AI - Imagen 4.0
- **Build Tool**: Vite 6.2
- **State Management**: React Hooks + Custom Hooks
- **Storage**: localStorage for preferences and history

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Google Gemini API Key** - Get yours at [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🚀 Quick Start

### 1. Clone or Download the Repository

```bash
git clone <repository-url>
cd ai-coverart-gen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

Create a `.env.local` file in the root directory (or rename the existing one):

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Generating Cover Art

1. **Enter a Title**: Type your video/podcast title in the input field
2. **Select Aspect Ratio**: Choose from 5 available aspect ratios
3. **Pick a Style Preset**: Select one of 8 artistic styles
4. **Generate**: Click "Generate Art" or press `Ctrl+Enter`
5. **Download/Copy/Share**: Use the action buttons on the generated image

### Using the History Feature

- Click the "History" dropdown to view previously generated images
- Click any thumbnail to reload that generation
- Use "Clear All" to remove all history

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Generate cover art |
| `Ctrl+D` | Download current image |
| `Ctrl+Shift+C` | Copy image to clipboard |

## 🏗️ Project Structure

```
ai-coverart-gen/
├── components/
│   ├── ImageDisplay.tsx        # Main image display with actions
│   ├── TitleInput.tsx          # Title input and aspect ratio selector
│   ├── StyleSelector.tsx       # Style preset selector
│   ├── ImageHistory.tsx        # Image history gallery
│   ├── ToastContainer.tsx      # Toast notification system
│   └── icons/                  # Icon components
├── hooks/
│   ├── useLocalStorage.ts      # localStorage hook
│   ├── useToast.ts            # Toast notification hook
│   └── useKeyboardShortcut.ts # Keyboard shortcut hook
├── services/
│   └── geminiService.ts       # Gemini AI API integration
├── types/
│   └── index.ts               # TypeScript type definitions
├── constants/
│   └── index.ts               # App constants and presets
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                   # Documentation
```

## 🔧 Configuration

### Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)

### Customization

You can customize the following in `constants/index.ts`:
- Style presets and their prompts
- Aspect ratios
- Keyboard shortcuts
- Local storage keys

## 🎨 Style Presets

Each style preset uses carefully crafted prompts to generate consistent artistic styles:

- **Cinematic**: Epic, movie-like quality with dramatic lighting
- **Minimalist**: Clean, modern design with negative space
- **Vibrant**: Bold, saturated colors with energetic composition
- **Dark & Moody**: Mysterious atmosphere with high contrast
- **Retro**: Vintage 80s/90s aesthetic with nostalgic vibes
- **Abstract**: Non-representational artistic forms
- **Photorealistic**: Lifelike, photograph-quality images
- **Illustrated**: Hand-drawn, artistic illustration style

## 🚨 Error Handling

The app includes robust error handling:
- **Automatic Retry**: Up to 2 retries with exponential backoff
- **API Key Validation**: Clear error messages for invalid keys
- **Content Policy**: Specific handling for policy violations
- **Network Errors**: Graceful handling of connectivity issues
- **User Feedback**: Toast notifications for all error states

## 🔒 Privacy & Data

- All data is stored locally in your browser
- No server-side storage or tracking
- Images are generated using Google's Gemini API
- History limited to 20 most recent generations
- Clear history anytime with one click

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `.env.local`
- Check that the file is named exactly `.env.local`
- Restart the dev server after adding the API key

### Generation Failures
- Check your internet connection
- Verify the API key is valid
- Try a different title or style
- Check the browser console for detailed errors

### Copy to Clipboard Not Working
- Ensure you're using HTTPS (required by Clipboard API)
- Check browser permissions for clipboard access
- Try the download option instead

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is part of the Google Gemini Vignettes collection.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)

## 🔗 Links

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [GitHub Repository](https://github.com/google-gemini-vignettes)

---

<div align="center">
Made with ❤️ using Google Gemini AI
</div>
