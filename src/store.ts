import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';
export type Enviroment = 'daylight' | 'sunset' | 'cloudy'

const enviromentInitialValue = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours < 17) {
    return 'daylight' as Enviroment;
  } else if (hours >= 17 && hours < 18 || hours >= 5 && hours < 6) {
    return 'sunset' as Enviroment;
  } else {
    return 'cloudy' as Enviroment;
  }
}

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
  enviroment: enviromentInitialValue(),
  setEnviroment: (enviroment) => set({ enviroment }),
}))

