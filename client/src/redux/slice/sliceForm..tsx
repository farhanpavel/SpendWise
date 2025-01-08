import { createSlice } from "@reduxjs/toolkit";
interface Task {
  _id: string;
  date: string;
  category: string;
  amount: number;
  purpose?: string;
}

const formSlice = createSlice({
  name: "Form",
  initialState: { tasks: [] as Task[] },
  reducers: {
    addTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});
export const { addTask } = formSlice.actions;
export default formSlice.reducer;
