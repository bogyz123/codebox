import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pasteTitle: null,
    pasteAuthor: null,
    pasteLength: 0,
    pasteContent: 'text',
    pasteObject: {}
}
const PasteSlice = createSlice({ // I'm using this slice whenever I need to share data about a particular paste between components.
    // Koristim ovaj slice da sharujem info o nekom pasteu izmedju komponenti.
    initialState,
    name: 'PasteSlice',
    reducers: {
        setPasteTitle(state, action) {
            state.pasteTitle = action.payload;
        },
        setPasteAuthor(state, action) {
            state.pasteAuthor = action.payload;
        },
        setPasteLength(state, action) {
            state.pasteLength = action.payload;
        },
        setPasteContent(state, action) {
            state.pasteContent = action.payload;
        },
        setPasteObject(state, action) {
            state.pasteObject = action.payload;
        }
    }
})
export const { setPasteAuthor, setPasteObject, setPasteContent, setPasteLength, setPasteTitle } = PasteSlice.actions;
export default PasteSlice.reducer;