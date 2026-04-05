import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-[5%] py-6 fixed top-0 w-full z-50 bg-[#0a0a0c]/50 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2.5">
                <ImageIcon size={28} className="text-purple-600" />
                <span className="text-xl font-bold tracking-tight">
                    Remov<span className="text-purple-600">AI</span>
                </span>
            </div>

            <div className="flex gap-7.5 font-medium text-sm">
                <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
                <Link href="/pricing" className="opacity-70 hover:opacity-100 transition-opacity">Pricing</Link>
                <Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity">About</Link>
            </div>

            <button className="glass px-5 py-2 text-sm font-semibold hover:bg-white/5 transition-all">
                Login
            </button>
        </nav>
    );
}
