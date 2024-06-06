// src/app/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import sizingReducer from "@ensol-test/features/sizingSlice";

const rootReducer = combineReducers({
  sizing: sizingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
