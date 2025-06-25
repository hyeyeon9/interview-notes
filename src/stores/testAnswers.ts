import { create } from "zustand";

interface AnswerState {
  answers: Record<string, string>;
  setAnswer: (questionId: string, answer: string) => void;
  clearAnswers: () => void;
}

export const useAnswerStore = create<AnswerState>((set) => ({
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  clearAnswers: () => set({ answers: {} }),
}));
