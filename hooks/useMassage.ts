import { create } from 'zustand'

interface IMassageStore {
	isOpenMassage: boolean
	isLoadingMassage: boolean
	onOpenMassage: () => void
	onCloseMassage: () => void
	startLoadingMassage: () => void
	stopLoadingMassage: () => void
}

export const useMassage = create<IMassageStore>(set => ({
	isOpenMassage: true,
	isLoadingMassage: false,
	onOpenMassage: () => set({ isOpenMassage: true }),
	onCloseMassage: () => set({ isOpenMassage: false }),
	startLoadingMassage: () => set({ isLoadingMassage: true }),
	stopLoadingMassage: () => set({ isLoadingMassage: false }),
}))
