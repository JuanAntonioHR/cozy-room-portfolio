import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';

interface AppState {
  focus: CameraFocus;
  setFocus: (focus: CameraFocus) => void;
  isEffectsEnabled: boolean;
  toggleEffects: () => void;
  isMusicEnabled: boolean;
  isSoundEnabled: boolean;
  setAudioSettings: (settings: { isMusicEnabled: boolean; isSoundEnabled: boolean }) => void;
  toggleMusic: () => void;
  toggleSound: () => void;
}

export const useStore = create<AppState>((set) => ({
  focus: 'idle',
  setFocus: (focus) => set({ focus }),
  isEffectsEnabled: true,
  toggleEffects: () => set((state) => ({ isEffectsEnabled: !state.isEffectsEnabled })),
  isMusicEnabled: false,
  isSoundEnabled: false,
  setAudioSettings: (settings) => set({ 
    ...settings,
  }),
  toggleMusic: () => set((state) => ({ isMusicEnabled: !state.isMusicEnabled })),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}))

