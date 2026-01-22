"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface TabsProps {
    defaultTab?: string;
    tabs: {
        id: string;
        label: string;
        content: React.ReactNode;
    }[];
}

export default function Tabs({ defaultTab, tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex gap-4 border-b border-white/10 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-4 font-semibold text-lg transition-all duration-300 relative ${activeTab === tab.id
                                ? "text-gradientColorStops-custom-green"
                                : "text-white/50 hover:text-white/80"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradientColorStops-custom-green"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">
                {tabs.map((tab) => (
                    <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tab.content}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
