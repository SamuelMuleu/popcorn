"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

interface TabsProps {
  defaultTab?: string;
  tabs: {
    id: string;
    label: string;
    count?: number;
    content: ReactNode;
  }[];
}

/** Abas acessíveis (setas do teclado, aria-selected) com contador opcional. */
export default function Tabs({ defaultTab, tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActiveTab(tabs[next].id);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Listas" className="mb-8 flex gap-1 overflow-x-auto border-b border-white/10 scrollbar-none">
        {tabs.map((tab, i) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative -mb-px inline-flex h-12 shrink-0 items-center gap-2 border-b-2 px-4 text-sm font-semibold transition-colors md:text-base ${
                selected
                  ? "border-green-400 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
              {typeof tab.count === "number" && (
                <span
                  className={`min-w-6 rounded-full px-1.5 text-xs tabular-nums leading-5 ${
                    selected ? "bg-green-500 text-black" : "bg-white/10 text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
