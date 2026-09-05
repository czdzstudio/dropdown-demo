import React, { useState } from 'react';
import { ArrowLeftRight, MapPin } from 'lucide-react';

export default function StationCard({
  origin,
  destination,
  onOpenSelector,
  onSwap,
  activeTarget // 'origin' | 'destination' | null
}) {
  const [isRotating, setIsRotating] = useState(false);

  const handleSwap = (e) => {
    e.stopPropagation();
    setIsRotating(true);
    onSwap();
    setTimeout(() => setIsRotating(false), 300);
  };

  const getFontSize = (name) => {
    if (!name) return 'text-xl sm:text-2xl font-bold';
    const len = name.length;
    if (len <= 3) return 'text-2xl sm:text-3xl font-bold tracking-wider';
    if (len <= 5) return 'text-xl sm:text-2xl font-bold tracking-tight';
    if (len <= 7) return 'text-base sm:text-lg font-bold leading-snug';
    if (len <= 9) return 'text-sm sm:text-base font-bold leading-tight';
    return 'text-xs sm:text-sm font-bold leading-tight'; // For 10~12 chars like 黎明經貿路口（會展中心）
  };

  return (
    <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-50/80 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-50/80 rounded-full blur-2xl pointer-events-none" />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        {/* Origin Station Box */}
        <button
          type="button"
          onClick={() => onOpenSelector('origin')}
          className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] min-h-[96px] justify-between ${
            activeTarget === 'origin'
              ? 'bg-blue-50/90 ring-2 ring-blue-500 shadow-sm'
              : 'bg-slate-50/90 hover:bg-slate-100/90'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-1 w-full">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
            <span className="truncate">起點站</span>
            {origin && (
              <span className="ml-auto text-[10px] font-mono text-blue-500 bg-blue-100/70 px-1.5 py-0.2 rounded flex-shrink-0">
                #{origin.id}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center w-full">
            {origin ? (
              <div className="w-full">
                <span className={`block text-slate-800 break-words ${getFontSize(origin.name)}`}>
                  {origin.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium truncate block mt-0.5">
                  {origin.sub || origin.type}
                </span>
              </div>
            ) : (
              <span className="text-base text-slate-400 font-medium">請選擇起點</span>
            )}
          </div>
        </button>

        {/* Swap Button (Centered, thumb-reachable) */}
        <div className="flex flex-col items-center justify-center -my-2 z-10 flex-shrink-0">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="對調起訖站"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-blue-300 active:scale-90 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-200 group"
          >
            <ArrowLeftRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isRotating ? 'rotate-180 text-blue-600 scale-110' : 'group-hover:rotate-180'
              }`}
            />
          </button>
        </div>

        {/* Destination Station Box */}
        <button
          type="button"
          onClick={() => onOpenSelector('destination')}
          className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] min-h-[96px] justify-between ${
            activeTarget === 'destination'
              ? 'bg-orange-50/90 ring-2 ring-orange-500 shadow-sm'
              : 'bg-slate-50/90 hover:bg-slate-100/90'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 mb-1 w-full">
            <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="truncate">訖點站</span>
            {destination && (
              <span className="ml-auto text-[10px] font-mono text-orange-500 bg-orange-100/70 px-1.5 py-0.2 rounded flex-shrink-0">
                #{destination.id}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center w-full">
            {destination ? (
              <div className="w-full">
                <span className={`block text-slate-800 break-words ${getFontSize(destination.name)}`}>
                  {destination.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium truncate block mt-0.5">
                  {destination.sub || destination.type}
                </span>
              </div>
            ) : (
              <span className="text-base text-slate-400 font-medium">請選擇訖點</span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
