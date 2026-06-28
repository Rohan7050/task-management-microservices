import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardType = {
  id: string;
  title: string;
  desc: string;
};

interface BoardState {
  board: BoardType[];
  setBoard: (boardList: BoardType[]) => void;
  clearBoard: () => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: [],
      setBoard: (boardList: BoardType[]) => {
        set({ board: boardList });
      },
      clearBoard: () => {
        set({ board: [] });
      },
    }),
    {
      name: "board-storage",
    },
  ),
);
