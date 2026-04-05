'use client';
import { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Loader2, X, Sparkles, RefreshCw, Palette, History, Settings, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_COLORS = [
    'transparent',
    '#ffffff',
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ff007f',
];

export default function UploadSection() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState('transparent');
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [format, setFormat] = useState<'png' | 'jpeg'>('png');
    const [quality, setQuality] = useState(0.9);
    const [showSettings, setShowSettings] = useState(false);
    const [history, setHistory] = useState<{ id: string; url: string }[]>([]);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const bgInputRef = useRef<HTMLInputElement>(null);

    // Load History from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('removai_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
            setBgColor('transparent');
            setBgImage(null);
        }
    };

    const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setBgImage(URL.createObjectURL(selectedFile));
            setBgColor('transparent');
        }
    };

    const removeImage = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
        setBgColor('transparent');
        setBgImage(null);
    };

    const handleRemoveBackground = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/remove-bg', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setResult(imageUrl);

            // Add to History (Limit to 5)
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result as string;
                const newHistory = [{ id: Date.now().toString(), url: base64data }, ...history].slice(0, 5);
                setHistory(newHistory);
                localStorage.setItem('removai_history', JSON.stringify(newHistory));
            };

        } catch (err: any) {
            setError(err.message || 'Failed to remove background. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = async () => {
        if (!result) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new (window as any).Image();
        
        img.crossOrigin = 'anonymous';
        img.src = result;
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                // 1. Draw Background
                if (bgImage) {
                    const bgImg = new (window as any).Image();
                    bgImg.src = bgImage;
                    bgImg.onload = () => {
                        // Stretch bg to fill canvas
                        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);
                        finalizeDownload(canvas);
                    };
                } else {
                    if (bgColor !== 'transparent') {
                        ctx.fillStyle = bgColor;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(img, 0, 0);
                    finalizeDownload(canvas);
                }
            }
        };
    };

    const finalizeDownload = (canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        const mimeType = `image/${format}`;
        link.href = canvas.toDataURL(mimeType, quality);
        link.download = `removai-${Date.now()}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('removai_history');
    };

    return (
        <section className="relative w-full pt-24 pb-32 overflow-hidden">
            {/* Background Glows */}
            <div className="glow-point top-1/4 -left-20 opacity-20" />
            <div className="glow-point bottom-1/4 -right-20 opacity-20" style={{ background: 'var(--accent-2)' }} />

            <div className="max-w-7xl mx-auto px-[5%] relative z-10">
                <div className="text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-400 text-base font-bold mb-10">
                            <Sparkles size={18} /> Magic Background Removal
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-[1.1] text-white">
                            Remove backgrounds <br />
                            <span className="gradient-text italic">in a single click.</span>
                        </h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-card min-h-[600px] p-10 md:p-16 relative mx-auto overflow-hidden group rounded-[40px]"
                >
                    <AnimatePresence mode="wait">
                        {!preview ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="h-[500px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-3xl transition-all p-12 md:p-20 bg-white/5 hover:bg-white/[0.07]"
                            >
                                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-full mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    <UploadCloud size={60} className="text-white" />
                                </div>
                                <h3 className="mb-4 text-3xl font-black text-white">Drop your image here</h3>
                                <p className="text-white/40 text-lg font-medium mb-8">PNG, JPG or WebP up to 12MB</p>
                                <div className="primary-button group-hover:px-12">
                                    Select File
                                </div>
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full flex flex-col items-center"
                            >
                                <div className={`w-full grid gap-12 ${result ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-1">
                                            <p className="text-lg font-bold text-white/50 uppercase tracking-widest">Original</p>
                                            {!loading && !result && (
                                                <button onClick={removeImage} className="text-white/40 hover:text-white transition-colors">
                                                    <X size={24} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-black/40 border border-white/10 shadow-2xl h-[400px]">
                                            <Image src={preview} alt="Original" fill className="object-contain" />
                                        </div>
                                    </div>

                                    {result && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex justify-between items-center px-1">
                                                <p className="text-lg font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Sparkles size={18} /> AI Result
                                                </p>
                                                <button 
                                                    onClick={() => setShowSettings(!showSettings)}
                                                    className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/50 hover:text-white'}`}
                                                >
                                                    <Settings size={20} />
                                                </button>
                                            </div>
                                            
                                            <div 
                                                className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square checkerboard border border-white/10 shadow-2xl h-[400px] transition-all duration-300"
                                                style={{ 
                                                    backgroundColor: bgColor !== 'transparent' ? bgColor : '',
                                                    backgroundImage: bgImage ? `url(${bgImage})` : '',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {!bgImage && bgColor === 'transparent' && <div className="absolute inset-0 checkerboard opacity-50" />}
                                                <Image src={result} alt="Result" fill className="object-contain relative z-10" />
                                            </div>

                                            {/* Advanced Controls */}
                                            <div className="space-y-6">
                                                {/* Tabs for Color/Image */}
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                                                        <button 
                                                            onClick={() => setBgImage(null)}
                                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!bgImage ? 'bg-white/10 text-white' : 'text-white/40'}`}
                                                        >
                                                            Solid Color
                                                        </button>
                                                        <button 
                                                            onClick={() => bgInputRef.current?.click()}
                                                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${bgImage ? 'bg-white/10 text-white' : 'text-white/40'}`}
                                                        >
                                                            {bgImage ? 'Change Image' : 'Custom Image'}
                                                        </button>
                                                        <input type="file" hidden ref={bgInputRef} accept="image/*" onChange={handleBgChange} />
                                                    </div>

                                                    {!bgImage ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {PRESET_COLORS.map((color) => (
                                                                <button
                                                                    key={color}
                                                                    onClick={() => setBgColor(color)}
                                                                    className={`w-9 h-9 rounded-full border-2 transition-all ${bgColor === color ? 'border-purple-500 scale-110 shadow-lg' : 'border-white/10'}`}
                                                                    style={{ 
                                                                        background: color === 'transparent' 
                                                                            ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%)' 
                                                                            : color,
                                                                        backgroundSize: '8px 8px'
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between px-3 py-2 bg-purple-600/10 border border-purple-600/20 rounded-xl">
                                                            <span className="text-xs font-bold text-purple-400 flex items-center gap-2">
                                                                <ImageIcon size={14} /> Background Image Active
                                                            </span>
                                                            <button onClick={() => setBgImage(null)} className="text-white/40 hover:text-white">
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Download Settings */}
                                                <AnimatePresence>
                                                    {showSettings && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden border-t border-white/5 pt-6 space-y-5"
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-bold text-white/40 uppercase">Format</label>
                                                                <div className="flex gap-2">
                                                                    {['png', 'jpeg'].map((f) => (
                                                                        <button 
                                                                            key={f}
                                                                            onClick={() => setFormat(f as any)}
                                                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${format === f ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/40'}`}
                                                                        >
                                                                            {f.toUpperCase()}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {format === 'jpeg' && (
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between text-xs font-bold text-white/40 uppercase">
                                                                        <span>Quality</span>
                                                                        <span>{Math.round(quality * 100)}%</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0.1" 
                                                                        max="1.0" 
                                                                        step="0.05"
                                                                        value={quality}
                                                                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                                                                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                                                    />
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="mt-16 flex flex-wrap justify-center gap-6">
                                    {!result ? (
                                        <button
                                            className="primary-button min-w-[300px] text-lg py-5"
                                            onClick={handleRemoveBackground}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={24} /> : <ImageIcon size={24} />}
                                            {loading ? 'Processing...' : 'Remove Background Now'}
                                        </button>
                                    ) : (
                                        <div className="flex flex-wrap justify-center gap-6">
                                            <button
                                                className="primary-button min-w-[240px] text-lg"
                                                onClick={downloadImage}
                                            >
                                                <Download size={24} />
                                                Download {format.toUpperCase()}
                                            </button>
                                            <button
                                                className="glass px-10 py-5 font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95 border border-white/10"
                                                onClick={removeImage}
                                            >
                                                <RefreshCw size={22} />
                                                Try Another
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-center flex items-center justify-center gap-3"
                        >
                            <X size={20} /> {error}
                        </motion.div>
                    )}
                </motion.div>

                {/* History Section */}
                {history.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-32 border-t border-white/5 pt-16"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                <History className="text-purple-500" /> Recent History
                            </h3>
                            <button 
                                onClick={clearHistory}
                                className="text-sm font-bold text-white/30 hover:text-red-400 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {history.map((item) => (
                                <div key={item.id} className="group relative">
                                    <div className="relative aspect-square rounded-2xl overflow-hidden glass-card checkerboard border border-white/5 group-hover:border-purple-500/50 transition-all">
                                        <Image src={item.url} alt="History" fill className="object-contain p-2" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <a 
                                                href={item.url} 
                                                download="removai-history.png"
                                                className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"
                                            >
                                                <Download size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
