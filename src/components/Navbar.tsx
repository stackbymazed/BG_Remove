import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

export default function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 5%',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            background: 'rgba(10, 10, 12, 0.5)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ImageIcon size={28} color="var(--accent-1)" />
                <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                    Remov<span style={{ color: 'var(--accent-1)' }}>AI</span>
                </span>
            </div>

            <div style={{ display: 'flex', gap: '30px', fontWeight: '500', fontSize: '14px' }}>
                <Link href="/">Home</Link>
                <Link href="/pricing" style={{ opacity: 0.7 }}>Pricing</Link>
                <Link href="/about" style={{ opacity: 0.7 }}>About</Link>
            </div>

            <button className="glass" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: '600' }}>
                Login
            </button>
        </nav>
    );
}
