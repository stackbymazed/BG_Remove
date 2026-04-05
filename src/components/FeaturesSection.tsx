export default function FeaturesSection() {
    const features = [
        {
            title: "Pixel-Perfect Edges",
            description: "Our neural engine handles fine hair, fur, and transparent materials that other tools miss, delivering production-ready cutouts every time.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
            ),
        },
        {
            title: "Lightning Fast",
            description: "Get studio-quality results in under 3 seconds. Batch process hundreds of images simultaneously without slowing down your workflow.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
            ),
        },
        {
            title: "Pro Export Quality",
            description: "Download transparent PNGs or high-quality JPEGs. Full resolution is preserved with absolutely no compression artifacts or blurriness.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 relative bg-white">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Built for speed & scale
                    </h2>
                    <p className="text-gray-500 text-lg font-medium max-w-2xl">
                        Every feature is crafted to save you time and deliver results that clients love. No manual touch-ups required.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-gray-600 text-base leading-relaxed font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
