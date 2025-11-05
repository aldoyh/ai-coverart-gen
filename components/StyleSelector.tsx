import React from 'react';
import { StylePreset } from '../types';
import { STYLE_PRESETS } from '../constants';

interface StyleSelectorProps {
  selectedStyle: StylePreset;
  onStyleChange: (style: StylePreset) => void;
  isLoading: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange, isLoading }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-400 mb-3">
        Style Preset
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STYLE_PRESETS.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onStyleChange(style)}
            disabled={isLoading}
            className={`p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-left ${
              selectedStyle.id === style.id
                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                : 'border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50'
            }`}
            title={style.description}
          >
            <div className="font-semibold text-sm text-white">{style.name}</div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(StyleSelector);
