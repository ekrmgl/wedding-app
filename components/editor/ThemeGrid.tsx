import { Theme } from '@/types';
import ThemeCard from './ThemeCard';

interface ThemeGridProps {
  themes: Theme[];
}

const ThemeGrid = ({ themes }: ThemeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {themes.map(theme => (
        <ThemeCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
};

export default ThemeGrid;