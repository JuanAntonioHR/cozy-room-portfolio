import { create } from 'zustand'

export type CameraFocus = 'idle' | 'switch' | 'gb' | 'ds';

interface AppState {
  focus: CameraFocus;
  setFocus: (focus: CameraFocus) => void;
}

export const useStore = create<AppState>((set) => ({
  focus: 'idle',
  setFocus: (focus) => set({ focus }),
}))