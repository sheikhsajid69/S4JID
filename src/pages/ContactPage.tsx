import { useEffect } from 'react';
import ContactSection from '../sections/ContactSection';

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
