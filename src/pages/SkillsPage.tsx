import { useEffect } from 'react';
import SkillsSection from '../sections/SkillsSection';

export default function SkillsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <SkillsSection />
    </div>
  );
}
