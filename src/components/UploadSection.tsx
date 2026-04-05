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
        <section style={{ padding: '100px 5% 50px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: 'env(48px, 3rem)', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1.5px' }}>
                    Remove backgrounds <br /> <span className="gradient-text">instantly with AI</span>
                </h1>
                <p style={{ opacity: 0.6, fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                    Upload your image and let our AI handle the rest. High-quality precision, zero effort.
                </p>
            </div>

            <div className="glass" style={{ minHeight: '400px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: '2px' }}>
                {!preview ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{ textAlign: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '50%', marginBottom: '20px', display: 'inline-block' }}>
                            <UploadCloud size={48} color="white" />
                        </div>
                        <h3 style={{ marginBottom: '10px' }}>Upload Image</h3>
                        <p style={{ opacity: 0.5, fontSize: '14px' }}>PNG, JPG or JPEG up to 10MB</p>
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '30px' }}>
                        <div style={{ position: 'relative' }}>
                            <p style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.7 }}>Original</p>
                            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
                                <Image src={preview} alt="Original" fill style={{ objectFit: 'contain' }} />
                                {!loading && !result && (
                                    <button
                                        onClick={removeImage}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '6px', borderRadius: '50%' }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {result && (
                            <div>
                                <p style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.7 }}>Result (Transparent PNG)</p>
                                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '400px', background: 'url(/checkerboard.png)', backgroundColor: '#333' }}>
                                    <Image src={result} alt="Result" fill style={{ objectFit: 'contain' }} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {preview && (
                    <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
                        {!result ? (
                            <button
                                className="primary-button"
                                onClick={handleRemoveBackground}
                                disabled={loading}
                                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                                {loading ? 'Processing...' : 'Remove Background'}
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    className="primary-button"
                                    onClick={downloadImage}
                                    style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                                >
                                    <Download size={20} />
                                    Download PNG
                                </button>
                                <button
                                    className="glass"
                                    onClick={removeImage}
                                    style={{ padding: '12px 24px', fontWeight: '600' }}
                                >
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && <p style={{ color: '#ef4444', marginTop: '20px', fontSize: '14px' }}>{error}</p>}
            </div>

            <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
}
