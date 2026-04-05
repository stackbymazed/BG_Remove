'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
    before: string;
    after: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function BeforeAfterSlider({ before, after, className = '', style }: BeforeAfterSliderProps) {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        
        setSliderPos(Math.max(0, Math.min(100, position)));
    };

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden cursor-ew-resize select-none ${className}`}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            style={style}
        >
            {/* Before (Original) - Left side */}
            <div className="absolute inset-0 w-full h-full bg-black/20">
                <Image 
                    src={before} 
                    alt="Before" 
                    fill 
                    className="object-contain" 
                    priority
                />
            </div>

            {/* After (Processed) - Right side */}
            <div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
                <div className="absolute inset-0 w-full h-full checkerboard" />
                <Image 
                    src={after} 
                    alt="After" 
                    fill 
                    className="object-contain relative z-10" 
                    priority
                />
            </div>

            {/* Handle */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-black/5">
                    <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-black/20 rounded-full" />
                        <div className="w-0.5 h-3 bg-black/20 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/10 pointer-events-none">
                Original
            </div>
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-purple-600/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white/70 border border-purple-600/20 pointer-events-none">
                AI Result
            </div>
        </div>
    );
}
