import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    pastes: {},
    nickname: "",
}
const UserSlice = createSlice({ // I use this whenever I need to share USER data between components.
    // Korstim ovaj Redux slice kada treba da delim info o useru izmedju komponenti.
    name: 'UserSlice',
    initialState,
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setPastes(state, action) {

            state.pastes = action.payload;
        },
        setNickname(state, action) {
            state.nickname = action.payload;
        }
    }
})
export const { setIsLoggedIn, setEmail, setNickname, setPastes } = UserSlice.actions;
export default UserSlice.reducer;