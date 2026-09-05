import React, { useState } from 'react';
import StationCard from './StationCard';
import StationBottomSheet from './StationBottomSheet';
import StationDesktopModal from './StationDesktopModal';

export default function StationPicker({
  stations,
  origin,
  destination,
  onChangeOrigin,
  onChangeDestination,
  onSwap,
  forceMobile = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectorMode, setSelectorMode] = useState('origin'); // 'origin' | 'destination'

  const handleOpenSelector = (mode) => {
    setSelectorMode(mode);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectStation = (station) => {
    if (selectorMode === 'origin') {
      onChangeOrigin(station);
      // Auto-advance UX: If destination is empty, automatically switch to select destination!
      if (!destination) {
        setSelectorMode('destination');
      } else {
        setIsOpen(false);
      }
    } else {
      onChangeDestination(station);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main interactive station display card */}
      <StationCard
        origin={origin}
        destination={destination}
        onOpenSelector={handleOpenSelector}
        onSwap={onSwap}
        activeTarget={isOpen ? selectorMode : null}
      />

      {/* Mobile Bottom Sheet Drawer */}
      <StationBottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        mode={selectorMode}
        onSwitchMode={(mode) => setSelectorMode(mode)}
        origin={origin}
        destination={destination}
        stations={stations}
        onSelectStation={handleSelectStation}
        isSimulator={forceMobile}
      />

      {/* Desktop Popover Modal */}
      {!forceMobile && (
        <StationDesktopModal
          isOpen={isOpen}
          onClose={handleClose}
          mode={selectorMode}
          onSwitchMode={(mode) => setSelectorMode(mode)}
          origin={origin}
          destination={destination}
          stations={stations}
          onSelectStation={handleSelectStation}
        />
      )}
    </div>
  );
}
