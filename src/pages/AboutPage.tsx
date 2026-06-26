import { useEffect } from 'react';
import AboutSection from '../sections/AboutSection';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <AboutSection />
    </div>
  );
}
