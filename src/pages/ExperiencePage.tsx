import { useEffect } from 'react';
import ExperienceSection from '../sections/ExperienceSection';

export default function ExperiencePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <ExperienceSection />
    </div>
  );
}
