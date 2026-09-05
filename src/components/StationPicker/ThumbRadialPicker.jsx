import React, { useState } from 'react';
import { Compass, Check, X, ArrowLeftRight, Navigation } from 'lucide-react';

export default function ThumbRadialPicker({
  stations,
  origin,
  destination,
  onChangeOrigin,
  onChangeDestination,
  onSwap
}) {
  const [activeMode, setActiveMode] = useState('origin'); // 'origin' | 'destination'
  const [isOpen, setIsOpen] = useState(false);

  const currentSelected = activeMode === 'origin' ? origin : destination;
  const disabledStation = activeMode === 'origin' ? destination : origin;

  const handleSelect = (station) => {
    if (activeMode === 'origin') {
      onChangeOrigin(station);
      if (!destination) {
        setActiveMode('destination');
      } else {
        setIsOpen(false);
      }
    } else {
      onChangeDestination(station);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 shadow-xl border border-slate-100 flex flex-col gap-3">
      {/* Top Title & Mode Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
          <span>風格 B：拇指扇形弧度滑選</span>
        </div>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
          人體工學弧線
        </span>
      </div>

      {/* Origin / Destination Quick Row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveMode('origin');
            setIsOpen(true);
          }}
          className={`p-3 rounded-2xl text-left border transition-all ${
            isOpen && activeMode === 'origin'
              ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20'
              : 'border-slate-200/80 bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-semibold text-blue-600 flex items-center justify-between">
            <span>起點</span>
            {origin && <span className="font-mono text-[10px]">#{origin.id}</span>}
          </div>
          <div className="font-bold text-slate-800 text-sm sm:text-base mt-0.5 line-clamp-2 min-h-[44px] flex items-center">
            {origin?.name || '請選起點'}
          </div>
        </button>

        <button
          type="button"
          onClick={onSwap}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:border-emerald-400 active:scale-90 flex items-center justify-center text-slate-600 transition-all"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveMode('destination');
            setIsOpen(true);
          }}
          className={`p-3 rounded-2xl text-left border transition-all ${
            isOpen && activeMode === 'destination'
              ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-500/20'
              : 'border-slate-200/80 bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-semibold text-orange-600 flex items-center justify-between">
            <span>訖點</span>
            {destination && <span className="font-mono text-[10px]">#{destination.id}</span>}
          </div>
          <div className="font-bold text-slate-800 text-sm sm:text-base mt-0.5 line-clamp-2 min-h-[44px] flex items-center">
            {destination?.name || '請選訖點'}
          </div>
        </button>
      </div>

      {/* Expanded Radial Arc List (Hugs bottom thumb arc) */}
      {isOpen && (
        <div className="mt-2 pt-3 border-t border-slate-100 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">
              選擇{activeMode === 'origin' ? '出發站' : '抵達站'}（依序圓弧滑動）：
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Curved list optimized for right/left thumb vertical sweep */}
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto no-scrollbar py-1">
            {stations.map((st, index) => {
              const isSelected = currentSelected?.id === st.id;
              const isDisabled = disabledStation?.id === st.id;

              // Arc curvature margin simulating thumb sweep (curves outwards in middle)
              const curveOffset = Math.sin((index / (stations.length - 1)) * Math.PI) * 14;

              return (
                <button
                  key={st.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelect(st)}
                  style={{ transform: `translateX(${curveOffset}px)` }}
                  className={`w-[calc(100%-16px)] flex items-center justify-between px-3.5 py-2.5 rounded-2xl border text-left transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : isDisabled
                      ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-60'
                      : 'bg-white border-slate-200/90 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      #{st.id}
                    </span>
                    <span
                      className={`font-semibold text-xs sm:text-sm truncate ${
                        isSelected ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {st.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {st.type}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    {isDisabled && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200 text-slate-500">
                        {activeMode === 'origin' ? '已是訖點' : '已是起點'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
