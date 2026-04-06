import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';
import FeaturesSection from '@/components/FeaturesSection';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-stretch relative">
      <div className="bg-grid" />
      <Navbar />
      {/* Navbar Spacer */}
      <div className="h-24 w-full shrink-0" />
      
      <div className="flex-1 flex flex-col">
        <UploadSection />
        <FeaturesSection />
        <SocialProof />
      </div>
      <Footer />
    </main>
  );
}
