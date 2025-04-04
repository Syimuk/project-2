import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://c5633c6edfcf29cc.mokky.dev";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get(`${BASE_URL}/tasks`);
  return res.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const res = await axios.post(`${BASE_URL}/tasks`, task);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${BASE_URL}/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: null,
    filter: "ALL",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
