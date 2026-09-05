import React from 'react';
import { Route, Check, ArrowRight, ArrowLeftRight } from 'lucide-react';

export default function BottomTrackPicker({
  stations,
  origin,
  destination,
  onChangeOrigin,
  onChangeDestination,
  onSwap
}) {
  const handleStationClick = (st) => {
    // Intuitive continuous flow:
    // If no origin or clicking the same origin, set origin.
    // If origin exists and destination is empty, set destination (unless same).
    if (!origin) {
      onChangeOrigin(st);
    } else if (!destination) {
      if (st.id === origin.id) {
        // Tap origin again -> reset
        onChangeOrigin(null);
      } else {
        onChangeDestination(st);
      }
    } else {
      // Both exist: if clicked origin, change origin; if clicked destination, change destination
      // Otherwise reset and set as new origin
      if (st.id === origin.id) {
        onChangeOrigin(null);
      } else if (st.id === destination.id) {
        onChangeDestination(null);
      } else {
        onChangeOrigin(st);
        onChangeDestination(null);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 shadow-xl border border-slate-100 flex flex-col gap-3">
      {/* Header with status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Route className="w-4 h-4 text-indigo-600" />
          <span>風格 C：捷運軌道路線直選（零彈窗）</span>
        </div>
        <button
          type="button"
          onClick={onSwap}
          disabled={!origin || !destination}
          className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 disabled:opacity-40 font-medium active:scale-95"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>對調起訖</span>
        </button>
      </div>

      {/* Origin / Destination Summary Pill */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
          <span className="font-semibold text-slate-800 truncate">
            {origin ? `#${origin.id} ${origin.name}` : '點選站點設為起點'}
          </span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 mx-2 flex-shrink-0" />
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
          <span className="font-semibold text-slate-800 truncate">
            {destination ? `#${destination.id} ${destination.name}` : '再點選訖點'}
          </span>
        </div>
      </div>

      {/* Route Linear Track (Single-hand thumb scrollable) */}
      <div className="relative pl-6 pr-2 py-2 space-y-2.5 max-h-[320px] overflow-y-auto no-scrollbar">
        {/* Track timeline line */}
        <div className="absolute left-[33px] top-4 bottom-4 w-0.5 bg-slate-200 pointer-events-none" />

        {stations.map((st, idx) => {
          const isOrigin = origin?.id === st.id;
          const isDest = destination?.id === st.id;
          const isInBetween =
            origin &&
            destination &&
            ((st.id > origin.id && st.id < destination.id) ||
              (st.id < origin.id && st.id > destination.id));

          return (
            <div key={st.id} className="relative flex items-center gap-3">
              {/* Timeline stop node */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold z-10 transition-all flex-shrink-0 ${
                  isOrigin
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                    : isDest
                    ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-110'
                    : isInBetween
                    ? 'bg-indigo-400 text-white ring-2 ring-indigo-50'
                    : 'bg-white border-2 border-slate-300 text-slate-500'
                }`}
              >
                {st.id}
              </div>

              {/* Station button */}
              <button
                type="button"
                onClick={() => handleStationClick(st)}
                className={`flex-1 flex items-center justify-between p-2.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
                  isOrigin
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-2xs'
                    : isDest
                    ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500 shadow-2xs'
                    : isInBetween
                    ? 'bg-indigo-50/40 border-indigo-200 text-indigo-900'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                    {st.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {st.sub}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isOrigin && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                      起點
                    </span>
                  )}
                  {isDest && (
                    <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-bold">
                      訖點
                    </span>
                  )}
                  {!isOrigin && !isDest && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {st.type}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
