/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export interface BatteryState {
  isLoading: boolean;
  isSupported: boolean;
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

/**
 * Hook to get battery status information.
 * Uses the Web Battery Status API.
 */
export const useBattery = (): BatteryState => {
  const [state, setState] = useState<BatteryState>({
    isLoading: true,
    isSupported: true,
    level: 0,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
  });

  useEffect(() => {
    let isMounted = true;
    let battery: any = null;

    const updateBatteryInfo = (b: any) => {
      if (!isMounted) return;
      setState({
        isLoading: false,
        isSupported: true,
        level: b.level,
        charging: b.charging,
        chargingTime: b.chargingTime,
        dischargingTime: b.dischargingTime,
      });
    };

    const handleChargingChange = () => updateBatteryInfo(battery);
    const handleLevelChange = () => updateBatteryInfo(battery);
    const handleChargingTimeChange = () => updateBatteryInfo(battery);
    const handleDischargingTimeChange = () => updateBatteryInfo(battery);

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any)
        .getBattery()
        .then((b: any) => {
          if (!isMounted) return;
          battery = b;
          updateBatteryInfo(battery);

          battery.addEventListener('chargingchange', handleChargingChange);
          battery.addEventListener('levelchange', handleLevelChange);
          battery.addEventListener('chargingtimechange', handleChargingTimeChange);
          battery.addEventListener('dischargingtimechange', handleDischargingTimeChange);
        })
        .catch(() => {
          if (isMounted) {
            setState((prev) => ({ ...prev, isLoading: false, isSupported: false }));
          }
        });
    } else {
      queueMicrotask(() => {
        if (isMounted) {
          setState((prev) => ({ ...prev, isLoading: false, isSupported: false }));
        }
      });
    }

    return () => {
      isMounted = false;
      if (battery) {
        battery.removeEventListener('chargingchange', handleChargingChange);
        battery.removeEventListener('levelchange', handleLevelChange);
        battery.removeEventListener('chargingtimechange', handleChargingTimeChange);
        battery.removeEventListener('dischargingtimechange', handleDischargingTimeChange);
      }
    };
  }, []);

  return state;
};
