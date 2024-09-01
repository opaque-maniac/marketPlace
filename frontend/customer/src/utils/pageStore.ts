import { create } from "zustand";

interface PageStore {
  page: number;
  setPage: (page: number) => void;
  resetPage: () => void;
}

const INITIAL_PAGE = 1;

export const explorePageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));

export const searchPageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));
