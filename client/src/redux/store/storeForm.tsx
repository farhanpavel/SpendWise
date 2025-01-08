import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slice/sliceForm.";

const store = configureStore({
  reducer: {
    counter: formReducer,
  },
});

export default store;
export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
