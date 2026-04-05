'use client';
import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Loader2, X } from 'lucide-react';
import Image from 'next/image';

export default function UploadSection() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const removeImage = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
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
        } catch (err: any) {
            setError(err.message || 'Failed to remove background. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result;
        link.download = `removai-${file?.name || 'result'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="px-[5%] py-[100px] pb-12 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-5 tracking-tighter leading-tight">
                    Remove backgrounds <br /> <span className="gradient-text">instantly with AI</span>
                </h1>
                <p className="opacity-60 text-lg md:text-xl max-w-2xl mx-auto">
                    Upload your image and let our AI handle the rest. High-quality precision, zero effort.
                </p>
            </div>

            <div className="glass min-h-[400px] p-10 flex flex-col items-center justify-center border-dashed border-2 border-white/10">
                {!preview ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer group"
                    >
                        <div className="bg-white/5 p-6 rounded-full mb-5 inline-block group-hover:scale-110 transition-transform">
                            <UploadCloud size={48} className="text-white" />
                        </div>
                        <h3 className="mb-2.5 text-xl font-semibold">Upload Image</h3>
                        <p className="opacity-50 text-sm">PNG, JPG or JPEG up to 10MB</p>
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className={`w-full max-w-4xl grid gap-8 ${result ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                        <div className="relative">
                            <p className="mb-2.5 text-sm opacity-70 font-medium">Original</p>
                            <div className="relative rounded-2xl overflow-hidden h-[400px] bg-black/20">
                                <Image src={preview} alt="Original" fill className="object-contain" />
                                {!loading && !result && (
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-2.5 right-2.5 bg-black/50 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {result && (
                            <div>
                                <p className="mb-2.5 text-sm opacity-70 font-medium">Result (Transparent PNG)</p>
                                <div className="relative rounded-2xl overflow-hidden h-[400px] bg-[url('/checkerboard.png')] bg-zinc-800">
                                    <Image src={result} alt="Result" fill className="object-contain" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {preview && (
                    <div className="mt-10 flex flex-wrap justify-center gap-5">
                        {!result ? (
                            <button
                                className="primary-button flex gap-2.5 items-center disabled:opacity-50"
                                onClick={handleRemoveBackground}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                                {loading ? 'Processing...' : 'Remove Background'}
                            </button>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    className="primary-button flex gap-2.5 items-center"
                                    onClick={downloadImage}
                                >
                                    <Download size={20} />
                                    Download PNG
                                </button>
                                <button
                                    className="glass px-6 py-3 font-semibold hover:bg-white/5 transition-all"
                                    onClick={removeImage}
                                >
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && <p className="text-red-500 mt-5 text-sm text-center">{error}</p>}
            </div>
        </section>
    );
}
