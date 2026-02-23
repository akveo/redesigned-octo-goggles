import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockServiceLogs } from "../../data/mockServiceLogs";
import { type ServiceLog, type DraftServiceLog } from "../../types";

interface ServiceLogsState {
  logs: ServiceLog[];
  draftLogs: DraftServiceLog[];
}

const initialState: ServiceLogsState = {
  logs: mockServiceLogs,
  draftLogs: [],
};

export const serviceLogsSlice = createSlice({
  name: "serviceLogs",
  initialState,
  reducers: {
    addServiceLog: (state, action: PayloadAction<ServiceLog>) => {
      state.logs.push(action.payload);
    },
    updateServiceLog: (state, action: PayloadAction<ServiceLog>) => {
      const index = state.logs.findIndex((log) => log.id === action.payload.id);
      if (index !== -1) {
        state.logs[index] = action.payload;
      }
    },
    deleteServiceLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload);
    },
    setServiceLogs: (state, action: PayloadAction<ServiceLog[]>) => {
      state.logs = action.payload;
    },
    saveDraft: (state, action: PayloadAction<DraftServiceLog>) => {
      const existingIndex = state.draftLogs.findIndex(
        (draft) => draft.draftId === action.payload.draftId
      );
      if (existingIndex !== -1) {
        state.draftLogs[existingIndex] = action.payload;
      } else {
        state.draftLogs.push(action.payload);
      }
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.draftLogs = state.draftLogs.filter(
        (draft) => draft.draftId !== action.payload
      );
    },
    clearAllDrafts: (state) => {
      state.draftLogs = [];
    },
  },
});

export const {
  addServiceLog,
  updateServiceLog,
  deleteServiceLog,
  setServiceLogs,
  saveDraft,
  deleteDraft,
  clearAllDrafts,
} = serviceLogsSlice.actions;

export default serviceLogsSlice.reducer;
