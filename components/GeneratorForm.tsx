import React, { useState } from 'react';
import { GeneratorSettings, JournalStyle } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Sparkles, Wand2 } from 'lucide-react';
import { DEFAULT_STYLES } from '../constants';

interface GeneratorFormProps {
  onGenerate: (settings: GeneratorSettings) => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [topic, setTopic] = useState('Botanical Garden');
  const [style, setStyle] = useState<JournalStyle>(JournalStyle.VINTAGE);
  const [count, setCount] = useState('2');

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty string for better typing experience
    if (val === '') {
      setCount('');
      return;
    }
    
    // Parse and clamp
    const num = parseInt(val);
    if (!isNaN(num)) {
      if (num > 50) {
        setCount('50');
      } else {
        setCount(val);
      }
    }
  };

  const handleBlur = () => {
    const num = parseInt(count);
    if (!count || isNaN(num) || num < 1) {
      setCount('1');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let num = parseInt(count);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 50) num = 50;

    onGenerate({
      topic,
      style,
      count: num,
      enhancePrompts: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold serif text-stone-900 flex items-center">
          <Wand2 className="w-5 h-5 mr-2 text-amber-600" />
          Page Configuration
        </h2>
        <p className="text-sm text-stone-500">Define the aesthetics for your journal pages.</p>
      </div>

      <div className="space-y-4">
        <Input 
          label="Topic or Theme"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Victorian Tea Party, Mushroom Forest..."
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select 
            label="Aesthetic Style"
            value={style}
            onChange={(e) => setStyle(e.target.value as JournalStyle)}
            options={DEFAULT_STYLES.map(s => ({ label: s, value: s }))}
          />
          <Input 
            label="Number of Pages (Max 50)"
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={handleCountChange}
            onBlur={handleBlur}
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full h-12 text-base shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-stone-800 to-stone-700"
          isLoading={isGenerating}
          icon={<Sparkles className="w-4 h-4" />}
        >
          {isGenerating ? 'Designing Pages...' : 'Generate Bulk Pages'}
        </Button>
      </div>
    </form>
  );
};