import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = "搜尋站名（例：台北、高雄國際航空站、TY...）",
  autoFocus = false
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Delay focus slightly to avoid jitter on mobile keyboard popup
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-10 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 text-base font-medium rounded-xl border border-slate-200/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="清除搜尋"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
        >
          <div className="w-6 h-6 rounded-full bg-slate-200/90 hover:bg-slate-300 flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-slate-600" />
          </div>
        </button>
      )}
    </div>
  );
}

