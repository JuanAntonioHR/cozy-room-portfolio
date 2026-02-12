import { create } from 'zustand'

export type CameraFocus = 'idle' | 'sw' | 'gb' | 'ds';
export type Enviroment = 'daylight' | 'sunset' | 'cloudy'

interface AppState {
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
  focus: 'idle',
  setFocus: (focus) => set({ focus }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  isEffectsEnabled: true,
  toggleEffects: () => set((state) => ({ isEffectsEnabled: !state.isEffectsEnabled })),
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  enviroment: 'daylight',
  setEnviroment: (enviroment) => set({ enviroment }),
}))

