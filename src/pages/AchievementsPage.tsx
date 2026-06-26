import { useEffect } from 'react';
import AchievementsSection from '../sections/AchievementsSection';

export default function AchievementsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <AchievementsSection />
    </div>
  );
}
