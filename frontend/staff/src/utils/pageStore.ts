import { create } from "zustand";

interface PageStore {
  page: number;
  setPage: (page: number) => void;
  resetPage: () => void;
}

const INITIAL_PAGE = 1;

export const productsPageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));

export const productsSearchPageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));

export const customersPageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));

export const customersSearchPageStore = create<PageStore>((set) => ({
  page: INITIAL_PAGE,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: INITIAL_PAGE }),
}));
