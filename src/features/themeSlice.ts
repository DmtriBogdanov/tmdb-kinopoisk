import {createSlice} from "@reduxjs/toolkit";

type Theme = 'light' | 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: (localStorage.getItem('theme') as Theme) || 'light'
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
})

export const {toggleTheme} = themeSlice.actions;