import React from 'react';
import { Check, AlertCircle, MapPin } from 'lucide-react';

export default function StationGrid({
  stations,
  selectedStation,
  disabledStation,
  onSelect,
  disabledReason = "已是起點"
}) {
  if (!stations || stations.length === 0) {
    return (
      <div className="py-12 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-slate-600 font-medium">查無相符站點</p>
        <p className="text-slate-400 text-xs mt-1">請嘗試輸入其他關鍵字或代碼</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-6">
      {stations.map((st) => {
        // Differentiate by id
        const isSelected = selectedStation?.id === st.id;
        const isDisabled = disabledStation?.id === st.id;
        const charLen = st.name.length;
        const isVeryLong = charLen >= 8;

        return (
          <button
            key={st.id}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelect(st)}
            className={`group relative flex flex-col justify-center px-3.5 py-3 min-h-[58px] rounded-2xl border text-left transition-all duration-150 ${
              isVeryLong ? 'col-span-1 sm:col-span-2' : 'col-span-1'
            } ${
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/30'
                : isDisabled
                ? 'bg-slate-100/70 border-slate-200/50 text-slate-300 cursor-not-allowed opacity-60'
                : 'bg-white border-slate-200/80 text-slate-800 hover:border-blue-400 hover:bg-blue-50/40 active:scale-[0.98] active:bg-blue-100/50 shadow-xs'
            }`}
          >
            {/* Top row: Sequence number + Name + Selection Indicator */}
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isDisabled
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}
                >
                  #{st.id}
                </span>

                <span
                  className={`font-semibold tracking-normal leading-snug break-words ${
                    charLen <= 4
                      ? 'text-base sm:text-lg'
                      : charLen <= 7
                      ? 'text-sm sm:text-base'
                      : 'text-xs sm:text-sm font-bold'
                  } ${isSelected ? 'text-white' : isDisabled ? 'text-slate-400' : 'text-slate-800'}`}
                >
                  {st.name}
                </span>
              </div>

              {isSelected && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </span>
              )}

              {isDisabled && (
                <span className="flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-500">
                  {disabledReason}
                </span>
              )}
            </div>

            {/* Bottom row: Subtitle & Station Type */}
            <div className="flex items-center justify-between gap-2 mt-1.5 pl-7">
              <span
                className={`text-[11px] truncate ${
                  isSelected ? 'text-blue-100' : isDisabled ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {st.sub || st.type}
              </span>

              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-medium flex-shrink-0 ${
                  isSelected ? 'bg-blue-700/50 text-blue-100' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {st.type}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
