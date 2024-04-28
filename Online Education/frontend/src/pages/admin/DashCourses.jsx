import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { courseLoadAction } from '../../redux/actions/courseAction';



const DashCourses = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseLoadAction())
    }, []);


    const { courses, loading } = useSelector(state => state.loadCourses);
    let data = [];
    data = (courses !== undefined && courses.length > 0) ? courses : []


    //delete course by Id
    const deleteCourseById = (e, id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Course ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Course name',
            width: 150,
        },
        {
            field: 'courseType',
            headerName: 'Category',
            width: 150,
            valueGetter: (data) => data.row.courseType.courseTypeName
        },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            valueGetter: (data) => data.row.user.firstName
        },
        {
            field: 'available',
            headerName: 'Video',
            width: 150,
            renderCell: (values) => (
                values.row.videoPath !== null ? "Yes" : "No"
            )
            
            

        },

        {
            field: 'theory',
            headerName: 'Theory',
            type: Number,
            width: 150,
            renderCell: ({ row }) => (
                row.theory.length > 5
                    ? `${row.theory.slice(0, 5)}...`
                    : row.theory
            )
        },       
        {/* {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/course/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteCourseById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }*/}

    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Courses list
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to="/admin/course/create">Create Course</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashCourses