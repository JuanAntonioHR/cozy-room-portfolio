import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';
export type Enviroment = 'daylight' | 'sunset' | 'cloudy'

const DEFAULT_ENVIROMENT = 'daylight';

interface AppState {
  focus: CameraFocus;
  setFocus: (focus: CameraFocus) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  isEffectsEnabled: true,
  toggleEffects: () => set((state) => ({ isEffectsEnabled: !state.isEffectsEnabled })),
  isMusicEnabled: false,
  isSoundEnabled: false,
  setAudioSettings: (settings) => set({ 
    ...settings,
  }),
  toggleMusic: () => set((state) => ({ isMusicEnabled: !state.isMusicEnabled })),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  enviroment: DEFAULT_ENVIROMENT,
  setEnviroment: (enviroment) => set({ enviroment }),
}))

