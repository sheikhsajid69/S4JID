import { useEffect } from 'react';
import ProjectsSection from '../sections/ProjectsSection';

export default function ProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <ProjectsSection />
    </div>
  );
}
