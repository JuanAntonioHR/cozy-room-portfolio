import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';
export type Enviroment = 'daylight' | 'sunset' | 'cloudy'

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
  enviroment: Enviroment;
  setEnviroment: (enviroment: Enviroment) => void;
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
  enviroment: 'daylight',
  setEnviroment: (enviroment) => set({ enviroment }),
}))

