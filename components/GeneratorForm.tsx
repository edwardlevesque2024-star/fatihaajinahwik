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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      topic,
      style,
      count: parseInt(count),
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
          <Select 
            label="Number of Pages"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            options={[
              { label: '1 Page', value: '1' },
              { label: '2 Pages', value: '2' },
              { label: '4 Pages', value: '4' }
            ]}
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
          {isGenerating ? 'Designing Pages...' : 'Generate Journal Pages'}
        </Button>
      </div>
    </form>
  );
};