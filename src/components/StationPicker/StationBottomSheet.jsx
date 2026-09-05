import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Sparkles, MapPin, Check, Route } from 'lucide-react';
import SearchBar from './SearchBar';
import StationGrid from './StationGrid';

export default function StationBottomSheet({
  isOpen,
  onClose,
  mode, // 'origin' | 'destination'
  onSwitchMode,
  origin,
  destination,
  stations,
  onSelectStation,
  isSimulator = false
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setCurrentY(0);
      setIsDragging(false);
    }
  }, [isOpen, mode]);

  // Touch gesture handling for swipe down to close
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const diff = touch.clientY - startY;
    if (diff > 0) {
      setCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (currentY > 100) {
      onClose();
    }
    setCurrentY(0);
    setIsDragging(false);
  };

  // Filter stations based on search query
  const filteredStations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return stations;
    return stations.filter((st) => {
      return (
        st.name.toLowerCase().includes(query) ||
        st.id.toString() === query ||
        st.pinyin.toLowerCase().includes(query) ||
        st.code.toLowerCase().includes(query) ||
        st.type.toLowerCase().includes(query)
      );
    });
  }, [stations, searchQuery]);

  if (!isOpen) return null;

  const currentSelected = mode === 'origin' ? origin : destination;
  const disabledStation = mode === 'origin' ? destination : origin;
  const disabledReason = mode === 'origin' ? '已是訖點' : '已是起點';

  return (
    <div
      className={
        isSimulator
          ? 'absolute inset-0 z-50 flex flex-col justify-end overflow-hidden rounded-[40px]'
          : 'fixed inset-0 z-50 flex flex-col justify-end md:hidden'
      }
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div
        ref={sheetRef}
        style={{
          transform: isDragging ? `translateY(${currentY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative z-10 w-full max-h-[88%] bg-white rounded-t-[32px] shadow-sheet flex flex-col overflow-hidden animate-slide-up"
      >
        {/* Drag Handle Area (Touch gesture for single hand swipe down) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="pt-3 pb-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-12 h-1.5 rounded-full bg-slate-300 active:bg-slate-400" />
        </div>

        {/* Sheet Header: Segmented Switcher & Close */}
        <div className="px-4 pb-2.5 flex items-center justify-between border-b border-slate-100">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => onSwitchMode('origin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'origin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'origin' ? 'bg-white' : 'bg-blue-500'}`} />
              <span>起點站</span>
              {origin && <span className="opacity-80 text-[10px]">#{origin.id}</span>}
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('destination')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'destination'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'destination' ? 'bg-white' : 'bg-orange-500'}`} />
              <span>訖點站</span>
              {destination && <span className="opacity-80 text-[10px]">#{destination.id}</span>}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 active:scale-95 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search bar section */}
        <div className="px-4 pt-3 pb-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              mode === 'origin'
                ? '搜尋起點（例：水湳、會展中心、中央公園...）'
                : '搜尋訖點（例：水湳、會展中心、中央公園...）'
            }
          />
        </div>

        {/* Quick Route Status Tag */}
        <div className="px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-medium">
            <Route className="w-3.5 h-3.5 text-blue-500" />
            <span>沿線站點（依行車站序排列）</span>
          </span>
          <span>共 {filteredStations.length} 站</span>
        </div>

        {/* Stations Scrollable Content */}
        <div className="flex-1 px-4 pt-1 overflow-y-auto overscroll-contain safe-bottom">
          <StationGrid
            stations={filteredStations}
            selectedStation={currentSelected}
            disabledStation={disabledStation}
            onSelect={onSelectStation}
            disabledReason={disabledReason}
          />
        </div>
      </div>
    </div>
  );
}
