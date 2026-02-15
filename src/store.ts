import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';
export type Enviroment = 'daylight' | 'sunset' | 'cloudy'

interface AppState {
  autoEffects: boolean;
  disableEffectsByPerformance: () => void;
  focus: CameraFocus;
  setFocus: (focus: CameraFocus) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isEffectsEnabled: boolean;
  toggleEffects: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  enviroment: Enviroment;
  setEnviroment: (enviroment: Enviroment) => void;
}

export const useStore = create<AppState>((set) => ({
  autoEffects: true,
  disableEffectsByPerformance: () =>
    set((state) =>
      state.autoEffects
        ? { isEffectsEnabled: false }
        : state
    ),
  focus: 'idle',
  setFocus: (focus) => set({ focus }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  isEffectsEnabled: true,
  toggleEffects: () => set((state) => ({ isEffectsEnabled: !state.isEffectsEnabled, autoEffects: false })),
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  enviroment: 'daylight',
  setEnviroment: (enviroment) => set({ enviroment }),
}))

