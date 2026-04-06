import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-xl py-32 mt-32">
            <div className="max-w-7xl mx-auto px-[5%] grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-500">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-gray-900">Remov<span className="text-indigo-600">AI</span></span>
                    </div>
                    <p className="max-w-xs text-xl font-medium leading-relaxed text-gray-600">
                        World's most powerful AI background removal tool. 
                        Join millions of users creating stunning content instantly.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900 transition-colors"><Twitter size={28} /></a>
                        <a href="#" className="hover:text-gray-900 transition-colors"><Github size={28} /></a>
                        <a href="#" className="hover:text-gray-900 transition-colors"><Linkedin size={28} /></a>
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-gray-900 font-bold uppercase tracking-widest">Product</h4>
                    <ul className="space-y-6 font-medium text-lg">
                        <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                        <li><a href="#" className="hover:text-indigo-600">API</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Templates</a></li>
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-gray-900 font-bold uppercase tracking-widest">Company</h4>
                    <ul className="space-y-6 font-medium text-lg">
                        <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                        <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-[5%] mt-32 pt-10 border-t border-gray-200 flex flex-col md:row justify-between items-center gap-6 text-base font-medium text-gray-500">
                <p>© 2026 RemovAI Corp. All rights reserved.</p>
                <p className="flex items-center gap-1">Made with <Heart size={16} className="text-red-500 fill-red-500" /> for creators.</p>
            </div>
        </footer>
    );
}
