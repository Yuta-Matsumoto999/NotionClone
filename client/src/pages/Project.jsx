import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectApi from '../api/projectApi';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { setProject } from '../redux/features/projectSlice';

const Project = () => {
    const { projectId } = useParams();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const projects = useSelector((state) => state.project.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProject = async () => {
            try {
                const project = await projectApi.getOne(projectId);
                setProjectName(project.name);
                setProjectDescription(project.description);
            } catch (err) {
                alert(err);
            }
        }
        getProject();
    }, [projectId]);

    const updateName = async (e) => {
        const newName = e.target.value;
        setProjectName(newName);

        try {
            const res = await projectApi.update(projectId, { name: newName });
        } catch (err) {
            alert(err);
        }

        const temp = [...projects];
        const index = projects.findIndex((e) => e._id === projectId);
        temp[index] = { ...temp[index], name: newName };

        dispatch(setProject(temp));
    }

    const updateDescription = async (e) => {
        const newDescription = e.target.value;
        setProjectDescription(newDescription);

        try {
            const res = await projectApi.update(projectId, { description: newDescription });
        } catch (err) {
            alert(err);
        }

        const temp = [...projects];
        const index = projects.findIndex((e) => e._id === projectId);
        temp[index] = { ...temp[index], description: newDescription };
    }

    return (
        <Box sx={{padding: "10px 50px"}}>
            <Box sx={{display: "flex", justifyContent: "between"}}>
                <TextField
                    value={projectName}
                    onChange={updateName}
                    placeholder="無題"
                    variant="outlined"
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "2rem", fontWeight: 700 },
                    }}
                />

                <IconButton
                    // onClick={deleteMemo}
                    variant="outlined"
                    color="error">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
            <Box>
                <TextField
                    value={projectDescription}
                    onChange={updateDescription}
                    placeholder="追加"
                    variant="outlined"
                    fullWidth
                    sx={{
                        "marginTop" : "15px",
                        "marginBottom": "15px",
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "1rem" }
                    }}
                />
            </Box>
            <Grid container spacing={2} sx={{borderBottom: "solid #eee", margin: "10px 0"}}>
                <Grid item xs={6}>
                    <Box sx={{display: "flex"}}>
                        <Button variant='text' color='natural' sx={{fontWeight: "700"}}>List</Button>
                        <Button variant='text' color='natural' sx={{fontWeight: "700"}}>GRAPH</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{display: "flex", justifyContent: "end"}}>
                        <Button variant='text' color='natural' sx={{fontWeight: "500"}}>フィルター</Button>
                        <Button variant='text' color='natural' sx={{fontWeight: "500"}}>並び替え</Button>
                        <Button variant='text' color='natural'><SearchIcon /></Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Project;