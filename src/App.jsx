import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
  Info,
  Layers,
  History,
  Bus,
  CheckCircle2,
  Sliders,
  Compass,
  Route,
  ChevronRight,
  Maximize2,
  Train
} from 'lucide-react';
import StationPicker from './components/StationPicker/StationPicker';
import ThumbRadialPicker from './components/StationPicker/ThumbRadialPicker';
import BottomTrackPicker from './components/StationPicker/BottomTrackPicker';
import { SHUINAN_STATIONS, TAIWAN_STATIONS, RECENT_SEARCHES } from './data/stations';

export default function App() {
  // Current active route dataset (Default: Shuinan, with one-click toggle to Taiwan Main Line)
  const [routeDataset, setRouteDataset] = useState('shuinan'); // 'shuinan' | 'taiwan'
  const stations = routeDataset === 'shuinan' ? SHUINAN_STATIONS : TAIWAN_STATIONS;

  // Origin & Destination state
  const [origin, setOrigin] = useState(SHUINAN_STATIONS[0]); // #1 水湳轉運中心
  const [destination, setDestination] = useState(SHUINAN_STATIONS[5]); // #6 黎明經貿路口（會展中心）

  // UI Variant Style Switcher:
  // 'sheet' (風格 A: 經典底部抽屜)
  // 'radial' (風格 B: 拇指扇形弧度滑選)
  // 'track' (風格 C: 捷運軌道路線直選)
  const [uiStyle, setUiStyle] = useState('sheet');

  // View Mode Switcher:
  // 'simulator' (原創經典：iPhone 15 實機外框展示模擬器)
  // 'mobile-fullscreen' (手機純淨實機滿版：適合手機真實單手操作)
  // 'desktop' (桌機寬螢幕卡片版)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('mobile')) return 'mobile-fullscreen';
      if (hash.includes('desktop')) return 'desktop';
      if (hash.includes('simulator')) return 'simulator';
      // Default: if opened on an actual mobile screen, can start in mobile-fullscreen, otherwise simulator
      return window.innerWidth < 640 ? 'mobile-fullscreen' : 'simulator';
    }
    return 'simulator';
  });

  // Ergonomic thumb-reach visualization overlay toggle
  const [showThumbZone, setShowThumbZone] = useState(false);

  // Booking confirmed alert feedback
  const [booked, setBooked] = useState(false);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('mobile')) setViewMode('mobile-fullscreen');
      else if (hash.includes('desktop')) setViewMode('desktop');
      else if (hash.includes('simulator')) setViewMode('simulator');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    if (mode === 'mobile-fullscreen') {
      window.location.hash = '#/mobile';
    } else if (mode === 'desktop') {
      window.location.hash = '#/desktop';
    } else {
      window.location.hash = '#/simulator';
    }
  };

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSwitchDataset = (type) => {
    setRouteDataset(type);
    if (type === 'shuinan') {
      setOrigin(SHUINAN_STATIONS[0]);
      setDestination(SHUINAN_STATIONS[5]);
    } else {
      setOrigin(TAIWAN_STATIONS[0]);
      setDestination(TAIWAN_STATIONS[6]);
    }
  };

  const handleSearchSubmit = () => {
    if (!origin || !destination) return;
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  // Whether the selector should render inside a simulated container
  const isInsideSimulatorFrame = viewMode === 'simulator';

  // Core Station Selector UI Component
  const renderCoreUI = () => (
    <div className="relative flex flex-col min-h-full pb-8">
      {/* Thumb-zone overlay indicator */}
      {showThumbZone && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl">
          <div className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full border-4 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
            <span className="text-xs font-bold text-emerald-800 bg-white/95 px-3 py-1 rounded-full shadow-sm">
              👍 舒適拇指自然觸控區 (Thumb Zone)
            </span>
          </div>
          <div className="absolute top-12 left-0 right-0 text-center">
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              ⚠️ 螢幕頂部單手難以觸及
            </span>
          </div>
        </div>
      )}

      {/* Hero / Header within view */}
      <div className="pt-2 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
              {routeDataset === 'shuinan' ? <Bus className="w-4 h-4" /> : <Train className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {routeDataset === 'shuinan' ? '水湳智慧接駁線' : '全台幹線跨城鐵道'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {routeDataset === 'shuinan' ? '支援 5~12 字繁體長站名排版' : '支援 2~8 字全台都會站名'}
              </p>
            </div>
          </div>

          {/* Dataset Switcher button */}
          <button
            type="button"
            onClick={() => handleSwitchDataset(routeDataset === 'shuinan' ? 'taiwan' : 'shuinan')}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 border border-slate-200/80 transition-all flex items-center gap-1 shadow-2xs"
          >
            <span>切換為{routeDataset === 'shuinan' ? '全台幹線' : '水湳線'}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Style Selector Tabs (風格 A / B / C) */}
        <div className="mb-3">
          <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sliders className="w-3 h-3 text-blue-600" />
              <span>切換單手操作模式風格：</span>
            </span>
            <button
              type="button"
              onClick={() => setShowThumbZone(!showThumbZone)}
              className="text-[10px] text-emerald-700 font-medium px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 active:scale-95 transition-transform"
            >
              拇指熱區: {showThumbZone ? '開' : '關'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setUiStyle('sheet')}
              className={`py-1.5 px-1 rounded-lg text-xs font-semibold transition-all ${
                uiStyle === 'sheet'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A. 底部抽屜
            </button>
            <button
              type="button"
              onClick={() => setUiStyle('radial')}
              className={`py-1.5 px-1 rounded-lg text-xs font-semibold transition-all ${
                uiStyle === 'radial'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              B. 扇形弧選
            </button>
            <button
              type="button"
              onClick={() => setUiStyle('track')}
              className={`py-1.5 px-1 rounded-lg text-xs font-semibold transition-all ${
                uiStyle === 'track'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              C. 軌道直選
            </button>
          </div>
        </div>

        {/* Selected Style Component */}
        {uiStyle === 'sheet' && (
          <StationPicker
            stations={stations}
            origin={origin}
            destination={destination}
            onChangeOrigin={setOrigin}
            onChangeDestination={setDestination}
            onSwap={handleSwap}
            forceMobile={isInsideSimulatorFrame}
          />
        )}

        {uiStyle === 'radial' && (
          <ThumbRadialPicker
            stations={stations}
            origin={origin}
            destination={destination}
            onChangeOrigin={setOrigin}
            onChangeDestination={setDestination}
            onSwap={handleSwap}
          />
        )}

        {uiStyle === 'track' && (
          <BottomTrackPicker
            stations={stations}
            origin={origin}
            destination={destination}
            onChangeOrigin={setOrigin}
            onChangeDestination={setDestination}
            onSwap={handleSwap}
          />
        )}
      </div>

      {/* Recent Trips Shortcuts */}
      {routeDataset === 'shuinan' && (
        <div className="mt-2 mb-3">
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
            <History className="w-3 h-3 text-slate-400" />
            <span>常用接駁組合（拇指一鍵套用）：</span>
          </div>
          <div className="space-y-1">
            {RECENT_SEARCHES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const o = stations.find((s) => s.id === item.fromId) || stations[0];
                  const d = stations.find((s) => s.id === item.toId) || stations[5];
                  setOrigin(o);
                  setDestination(d);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-slate-200/70 hover:border-slate-300 active:bg-slate-50 transition-colors text-xs font-medium text-slate-700 shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5 truncate pr-2 min-w-0">
                  <span className="font-semibold text-slate-800 truncate">#{item.fromId} {item.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">#{item.toId} {item.to}</span>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{item.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trip Information Summary Card */}
      {origin && destination && (
        <div className="mt-auto pt-2">
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg mb-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                預估時間：約 {routeDataset === 'shuinan' ? `${Math.max(4, Math.abs(destination.id - origin.id) * 3)} 分鐘` : '1 小時 34 分'}
              </span>
              <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                {routeDataset === 'shuinan' ? '每 8 分鐘一班' : '直達快車'}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-[10px] text-slate-400">{routeDataset === 'shuinan' ? '接駁票價' : '標準全票'}</span>
                <div className="text-base font-bold text-white tracking-wide">
                  {routeDataset === 'shuinan' ? '刷卡免費 / NT$ 0' : 'NT$ 1,490 起'}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearchSubmit}
                className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 font-semibold text-xs text-white shadow-md shadow-blue-500/30 transition-all flex items-center gap-1.5"
              >
                <span>確認班次</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {booked && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-semibold animate-pop max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">已選定 #{origin?.id} {origin?.name} 往 #{destination?.id} {destination?.name}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar & Viewport Mode Switcher (Always accessible on all devices) */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Transit UI
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                極致單手友善・起訖站下拉選單
              </h1>
            </div>
          </div>

          {/* Three View Modes Switcher: Simulator | Fullscreen Mobile | Desktop */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-end overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
              <button
                type="button"
                onClick={() => handleSetViewMode('simulator')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'simulator'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>原創模擬框</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetViewMode('mobile-fullscreen')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'mobile-fullscreen'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>手機純淨滿版</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetViewMode('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>桌機寬版</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 overflow-hidden">
        {viewMode === 'simulator' ? (
          /* Mode 1: The Original iPhone 15 Frame Simulator */
          <div className="relative w-full max-w-[390px] h-[780px] max-h-[85vh] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-[6px] border-slate-700 ring-1 ring-white/10 flex flex-col animate-pop">
            {/* Dynamic Island / Speaker */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800 ring-1 ring-blue-900/40" />
            </div>

            {/* Inner Phone Screen */}
            <div className="relative flex-1 bg-slate-50 text-slate-800 rounded-[40px] pt-8 px-4 pb-4 overflow-y-auto no-scrollbar flex flex-col">
              {renderCoreUI()}
              {/* Home indicator bar at bottom */}
              <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mt-auto pt-0.5 flex-shrink-0" />
            </div>
          </div>
        ) : viewMode === 'mobile-fullscreen' ? (
          /* Mode 2: Clean Native Mobile (No Bezel, fills mobile screens naturally) */
          <div className="w-full max-w-[480px] min-h-[680px] bg-slate-50 text-slate-800 sm:rounded-3xl p-4 sm:p-6 shadow-2xl sm:border border-slate-200/80 animate-fade-in flex-1 sm:flex-initial">
            {renderCoreUI()}
          </div>
        ) : (
          /* Mode 3: Desktop Widescreen Layout */
          <div className="w-full max-w-2xl bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 animate-fade-in">
            {renderCoreUI()}
          </div>
        )}

        {/* Feature Highlights Footer info */}
        <div className="mt-3 max-w-2xl text-center text-xs text-slate-400 space-y-1">
          <p className="flex items-center justify-center gap-1 font-medium text-slate-400">
            <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            頂部可隨時自由切換「原創模擬框」、「手機純淨滿版」與「桌機寬版」，支援多種單手互動與站點資料！
          </p>
        </div>
      </main>
    </div>
  );
}
