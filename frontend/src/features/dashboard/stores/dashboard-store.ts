import { create } from 'zustand'

type State = {
  currentSection: string
}

type Action = {
  updateSection: (section: State['currentSection']) => void
}

export const useDashboard = create<State & Action>(set => ({
  currentSection: '...',
  updateSection: section => set(state => ({ ...state, currentSection: section })),
}))
