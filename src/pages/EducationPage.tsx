import { useEffect } from 'react';
import EducationSection from '../sections/EducationSection';

export default function EducationPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <EducationSection />
    </div>
  );
}
