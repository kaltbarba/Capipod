import { create } from "zustand";

import type { LogEntry } from "../../types";

interface LogState {
  logs: LogEntry[];
  addLog: (log: LogEntry) => void;
  clearLogs: () => void;
}

const useLogStore = create<LogState>((set) => ({
  logs: [],

  addLog: (log) => set((state) => ({ ...state, logs: [...state.logs, log] })),

  clearLogs: () => set({ logs: [] }),
}));

export default useLogStore;
