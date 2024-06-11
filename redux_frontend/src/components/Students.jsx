import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Radio, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Formik, Field, Form } from 'formik';
import { editStudents, fetchStudents, setEditId } from '../app/studentSlice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let tostify = (Msg, Type) => {
    const OPTION = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    }

    toast[Type](Msg, OPTION);
}


function Students() {

    let [Search, SetSearch] = useState("");

    const dispatch = useDispatch();

    const STUDENTS = useSelector(state => state.student.students);
    const INITIAL = useSelector(state => state.student.initial);
    const E_ID = useSelector(state => state.student.eid);

    let GET_STUDENTS = () => {

        axios.get("http://localhost:3000/student/")
            .then((res) => {
                // console.log(res.data.STUDENT_DATA);
                dispatch(fetchStudents(res.data.STUDENT_DATA));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let DELETE_HANDLER = (delete_id) => {
        axios.delete("http://localhost:3000/student/" + delete_id)
            .then((res) => {
                // console.log(res);
                GET_STUDENTS();
                tostify(res.data.message, 'success')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let EDIT_HANDLER = (el) => {

        const date = new Date(el.dob);
        const formattedDate = date.toISOString().split('T')[0];

        // console.log(formattedDate); // SET DATE FORMAT LIKE (YYYY/MM/DD) //

        dispatch(editStudents({ surname: el.surname, name: el.name, age: el.age, dob: formattedDate, gender: el.gender, email: el.email, mobile: el.mobile }))
        dispatch(setEditId(el._id))
    }

    useEffect(() => {
        GET_STUDENTS();
    }, [])

    return (
        <Box>
            <Container maxWidth="xl" sx={{ mt: 8 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card sx={{ width: "500px", p: 5, border: "1px solid #00000047" }} className='NewDesign'>
                        <Box sx={{ backgroundColor: "#1976d2d2", borderRadius: "5px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                            <Typography variant="h6" color="white" sx={{ textAlign: "center" }} > CRUD REACT REDUX &nbsp; ( WEBITO TASK - 3 ) </Typography>
                        </Box>
                        <Formik
                            initialValues={INITIAL}
                            enableReinitialize
                            onSubmit={async (values, action) => {

                                if (E_ID) {

                                    axios.put("http://localhost:3000/student/" + E_ID, values)
                                        .then((res) => {
                                            console.log(res);
                                            GET_STUDENTS();
                                            action.resetForm();
                                            tostify(res.data.message, 'success')
                                            dispatch(setEditId(null))
                                            dispatch(editStudents({ surname: '', name: '', age: '', dob: '', gender: '', email: '', mobile: '' }))
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            tostify(err.response.data.error, 'error')

                                        })
                                }
                                else {
                                    axios.post("http://localhost:3000/student/add/", values)
                                        .then((res) => {
                                            console.log(res);
                                            GET_STUDENTS();
                                            action.resetForm();
                                            tostify(res.data.message, 'success')
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            tostify(err.response.data.errors[0], 'error')

                                        })
                                }
                            }}
                        >
                            <Form autoComplete='off'>
                                <Typography sx={{ mt: 2.5, mb: 1 }}> SURNAME </Typography>
                                <Field fullWidth as={TextField} id="surname" name="surname" placeholder="ENTER YOUR SURNAME" type="text" autoComplete="on" />

                                <Typography sx={{ mt: 2.5, mb: 1 }}> NAME</Typography>
                                <Field fullWidth as={TextField} id="name" name="name" placeholder="ENTER YOUR NAME" type="text" autoComplete="on" />

                                <Typography sx={{ mt: 2.5, mb: 1 }}>AGE</Typography>
                                <Field fullWidth as={TextField} id="age" name="age" placeholder="ENTER YOUR AGE" type="number" autoComplete="on" />

                                <Typography sx={{ mt: 2.5, mb: 1 }}>DATE</Typography>
                                <Field fullWidth as={TextField} id="dob" name="dob" placeholder="ENTER YOUR AGE" type="date" autoComplete="on" />

                                <Box sx={{ px: 2, display: "flex", alignItems: "center", justifyContent: "space-between", my: 4, border: "1px solid #80808075", borderRadius: "5px" }}>
                                    <Typography sx={{ mr: 2 }}>SELECT GENDER </Typography>

                                    <Field as={Radio} id="Male" name="gender" type="radio" value="Male" />
                                    MALE
                                    <Field as={Radio} id="Female" name="gender" type="radio" value="Female" />
                                    FEMALE
                                    <Field as={Radio} id="Other" name="gender" type="radio" value="Other" />
                                    OTHER
                                </Box>

                                <Typography sx={{ mt: 2.5, mb: 1 }}>E - MAIL</Typography>
                                <Field fullWidth as={TextField} id="email" name="email" placeholder="ENTER YOUR E MAIL HERE" type="email" autoComplete="on" />

                                <Typography sx={{ mt: 2.5, mb: 1 }}>MOBILE NO</Typography>
                                <Field fullWidth as={TextField} id="mobile" name="mobile" placeholder="ENTER YOUR MOBILE NO" autoComplete="on" />

                                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", gap: 5, mt: 4.5 }}>
                                    <Button fullWidth sx={{ backgroundColor: "#1976d2d2" }} variant='contained' type='reset' endIcon={<RefreshIcon />}>RESET</Button>
                                    <Button fullWidth sx={{ backgroundColor: "#1976d2d2" }} variant='contained' type='submit' endIcon={<DoneIcon />}>SUBMIT</Button>
                                </Box>
                            </Form>
                        </Formik>
                    </Card>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ my: 8 }}>

                <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                    <PersonSearchIcon sx={{ mr: 2, boxShadow: " 0 8px 32px 0 rgba(31, 38, 135, 0.37)", fontSize: "54px", backgroundColor: "#1976d2d2", borderRadius: "5px", color: "white", width: "100px" }} />
                    <TextField sx={{ boxShadow: " 0 8px 32px 0 rgba(31, 38, 135, 0.37)" }} fullWidth label="SEARCH DATA BY NAME / SURNAME / AGE" id="fullWidth" onChange={(e) => SetSearch(e.target.value)} />
                </Box>

                <TableContainer component={Paper} className='NewDesign'>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2d2" }}>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>INDEX</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>SURNAME</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>NAME</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>AGE</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>DOB</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>GENDER</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>E - MAIL</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>MOBILE</TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>EDIT </TableCell>
                                <TableCell align='center' sx={{ color: "white", fontSize: "16px" }}>DELETE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                STUDENTS.filter((items) => {

                                    if (Search === "") {
                                        return items
                                    }
                                    else if (items.surname.toLowerCase().includes(Search.toLowerCase()) || items.name.toLowerCase().includes(Search.toLowerCase()) || items.age.toString().includes(Search)) {
                                        return items
                                    }
                                }).map((el, index) => {
                                    return (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align='center' component="th" scope="row"> {index + 1}</TableCell>
                                            <TableCell align="center"> {el.surname}</TableCell>
                                            <TableCell align="center"> {el.name}</TableCell>
                                            <TableCell align="center"> {el.age}</TableCell>
                                            <TableCell align="center"> {el.dob}</TableCell>
                                            <TableCell align="center" sx={{ textTransform: "uppercase" }}> {el.gender}</TableCell>
                                            <TableCell align="left"> {el.email}</TableCell>
                                            <TableCell align="center"> {el.mobile}</TableCell>
                                            <TableCell align="center"><Button startIcon={<EditIcon />} sx={{ backgroundColor: "#1976d2d2" }} variant='contained' onClick={() => EDIT_HANDLER(el)}> EDIT </Button></TableCell>
                                            <TableCell align="center"><Button startIcon={<DeleteIcon />} sx={{ backgroundColor: "#1976d2d2" }} variant='contained' onClick={() => DELETE_HANDLER(el._id)}>DELETE </Button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce} />
        </Box>
    )
}

export default Students;