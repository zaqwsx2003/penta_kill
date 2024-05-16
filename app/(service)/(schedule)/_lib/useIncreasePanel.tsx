import { create } from "zustand";

type PanelStore = {
    openPanels: { [key: string]: boolean };
    onOpen: (id: string) => void;
    onClose: (id: string) => void;
};

export const useIncreasePanel = create<PanelStore>((set) => ({
    openPanels: {},
    onOpen: (id: string) =>
        set((state) => ({
            openPanels: { ...state.openPanels, [id]: true },
        })),
    onClose: (id: string) =>
        set((state) => ({
            openPanels: { ...state.openPanels, [id]: false },
        })),
}));
