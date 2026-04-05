import Navbar from '@/components/Navbar';
import UploadSection from '@/components/UploadSection';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <UploadSection />
      </div>

      <footer style={{
        marginTop: 'auto',
        padding: '40px 0',
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid var(--glass-border)',
        opacity: 0.5,
        fontSize: '14px'
      }}>
        <p>&copy; 2026 RemovAI. All rights reserved.</p>
      </footer>
    </main>
  );
}
