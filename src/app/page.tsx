import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex-1 flex flex-col w-full">
        <UploadSection />
      </div>

      <footer className="mt-auto py-10 w-full text-center border-t border-white/10 opacity-50 text-sm">
        <p>&copy; 2026 RemovAI. All rights reserved.</p>
      </footer>
    </main>
  );
}
