import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/user/loginSlice'
import articleReducer from '../features/article/articleSlice'
import leftReducer from '../features/Game/LeftSlice'
import gameReducer from '../features/Game/GameSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    info: articleReducer,
    left: leftReducer,
    game: gameReducer,
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
