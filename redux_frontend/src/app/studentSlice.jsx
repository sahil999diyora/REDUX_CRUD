import { createSlice } from '@reduxjs/toolkit'

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        initial: { surname: '', name: '', age: '', dob: '', gender: '', email: '', mobile: '' },
        eid: null
    },
    reducers: {
        fetchStudents: (state, action) => {
            state.students = action.payload
        },
        editStudents: (state, action) => {
            state.initial = action.payload
        },
        setEditId: (state, action) => {
            state.eid = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchStudents, editStudents, setEditId } = studentSlice.actions

export default studentSlice.reducer