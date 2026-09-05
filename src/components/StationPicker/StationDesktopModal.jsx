import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Sparkles, MapPin, Route } from 'lucide-react';
import SearchBar from './SearchBar';
import StationGrid from './StationGrid';

export default function StationDesktopModal({
  isOpen,
  onClose,
  mode, // 'origin' | 'destination'
  onSwitchMode,
  origin,
  destination,
  stations,
  onSelectStation
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, mode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
    <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Popover / Modal Box */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[82vh] overflow-hidden animate-pop"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => onSwitchMode('origin')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'origin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'origin' ? 'bg-white' : 'bg-blue-500'}`} />
              <span>選擇起點站</span>
              {origin && <span className="opacity-80 text-xs">#{origin.id}</span>}
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('destination')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'destination'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'destination' ? 'bg-white' : 'bg-orange-500'}`} />
              <span>選擇訖點站</span>
              {destination && <span className="opacity-80 text-xs">#{destination.id}</span>}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4 pb-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            autoFocus={true}
            placeholder={
              mode === 'origin'
                ? '搜尋起點（支援長短站名、代碼搜尋）'
                : '搜尋訖點（支援長短站名、代碼搜尋）'
            }
          />
        </div>

        <div className="px-6 py-1.5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 font-medium">
            <Route className="w-3.5 h-3.5 text-blue-500" />
            <span>依序排列之沿線站點清單</span>
          </span>
          <span>共 {filteredStations.length} 站</span>
        </div>

        {/* Grid of stations */}
        <div className="flex-1 px-6 pt-2 pb-6 overflow-y-auto max-h-[420px]">
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
