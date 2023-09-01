import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import eventReducer from "./features/event/eventSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    modal: modalReducer,
  },
});
