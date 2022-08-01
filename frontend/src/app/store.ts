import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/user/loginSlice'
import articleReducer from '../features/article/articleSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    info: articleReducer

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
