import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import PasteSlice from "./PasteSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
    reducer: {
        UserSlice: UserSlice,
        PasteSlice: PasteSlice
    },
    middleware: getDefaultMiddleware(),
})