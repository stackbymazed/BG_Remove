"use client";

const testimonials = [
    { name: "Sarah J.", role: "Graphic Designer", text: "This tool cut my masking time in half. The edge detection on hair is unbelievable.", rating: 5 },
    { name: "Mark T.", role: "E-commerce Owner", text: "Uploading hundreds of product photos and getting perfect white backgrounds instantly changed my business.", rating: 5 },
    { name: "Jessica R.", role: "Social Media Manager", text: "I use this every single day for Instagram thumbnails. Fastest bg remover out there.", rating: 5 },
    { name: "David C.", role: "Photographer", text: "Retains the finest details. A must-have in my editing pipeline.", rating: 5 },
    { name: "Elena M.", role: "Content Creator", text: "The custom backdrop feature is seamless. Makes my YouTube thumbnails pop!", rating: 5 },
    { name: "James K.", role: "Product Designer", text: "Clean cutouts, no jagged edges. Finally a tool that does what it promises.", rating: 5 },
];

const avatarColors = [
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-rose-100 text-rose-700',
    'bg-amber-100 text-amber-700',
    'bg-emerald-100 text-emerald-700',
    'bg-indigo-100 text-indigo-700',
];

export default function SocialProof() {
    const doubled = [...testimonials, ...testimonials];

    return (
        <section className="py-20 sm:py-32 relative overflow-hidden bg-white/50 border-y border-gray-100">
            <div className="text-center mb-12 sm:mb-16 px-5 max-w-2xl mx-auto">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">Wall of Love</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Trusted by <span className="gradient-text-accent">2M+ creators</span>
                </h2>
                <p className="text-gray-500 text-lg font-medium">Join thousands of designers, marketers, and developers building better visuals.</p>
            </div>

            {/* Marquee wrapper */}
            <div className="relative">
                {/* Fixed fade edges for light theme */}
                <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden w-full">
                    <div className="flex flex-row items-stretch w-max gap-4 sm:gap-6 marquee-track py-4">
                        {doubled.map((t, i) => (
                            <div
                                key={i}
                                className="clean-card w-[300px] sm:w-[350px] p-6 sm:p-8 shrink-0 flex flex-col justify-between"
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-5">
                                    {Array.from({ length: t.rating }).map((_, s) => (
                                        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" className="shrink-0">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">"{t.text}"</p>

                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                                    <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-bold shrink-0`}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 text-sm font-bold leading-none mb-1">{t.name}</p>
                                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
