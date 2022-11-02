import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectApi from '../api/projectApi';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { setProject } from '../redux/features/projectSlice';
import EmojiPicker from "../components/common/EmojiPicker";
import ProjectDeleteAlert from '../components/alert/ProjectDeleteAlert';
import TagCreate from '../components/form/TagCreate';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { setTag } from '../redux/features/tagSlice';
import TagListGroup from '../components/listGroup/TagListGroup';

const Project = () => {
    const { projectId } = useParams();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [tags, setTags] = useState([]);
    const [isShowProjectDeleteAlert, setIsShowProjectDeleteAlert] = useState(false);
    const [isShowTagCreate, setIsShowTagCreate] = useState(false);
    const projects = useSelector((state) => state.project.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProject = async () => {
            try {
                const project = await projectApi.getOne(projectId);
                console.log(project);
                setProjectName(project.name);
                setProjectDescription(project.description);
                setIcon(project.icon);
                setTags(project.tags);

                dispatch(setTag(project.tags));
            } catch (err) {
                alert(err);
            }
        }
        getProject();
    }, [projectId]);

    let timer;
    const time = 500;

    const updateName = (e) => {
        clearTimeout(timer);
        const newName = e.target.value;

        setProjectName(newName);

        let temp = [...projects];
        const index = projects.findIndex((e) => e._id === projectId);
        temp[index] = { ...temp[index], name: newName };

        dispatch(setProject(temp));

        timer = setTimeout(async () => {
            try {
                const res = await projectApi.update(projectId, { name: newName });
            } catch (err) {
                alert(err);
            }
        },
        time);
    }

    const updateDescription = (e) => {
        const newDescription = e.target.value;
        setProjectDescription(newDescription);

        let temp = [...projects];
        const index = projects.findIndex((e) => e._id === projectId);
        temp[index] = { ...temp[index], description: newDescription };

        dispatch(setProject(temp));

        timer = setTimeout(async () => {
            try {
                const res = await projectApi.update(projectId, { description: newDescription });
            } catch (err) {
                alert(err);
            }
        },
        time);
    }

    const onIconChange = async (newIcon) => {
        let temp = [...projects];
        const index = projects.findIndex((e) => e._id === projectId);
        temp[index] = {...temp[index], icon: newIcon};

        setIcon(newIcon);
        dispatch(setProject(temp));

        try {
            const res = await projectApi.update(projectId, {
                icon : newIcon
            });
        } catch (err) {
            alert(err);
        }
    }

    const handleDeleteAlert = (state) => {
        if(state === false) {
            setIsShowProjectDeleteAlert(false);
        } else {
            setIsShowProjectDeleteAlert(!isShowProjectDeleteAlert);
        }
    }

    const handleTagCreateForm = (state) => {
        if(state === false) {
            setIsShowTagCreate(false);
        } else {
            setIsShowTagCreate(!isShowTagCreate);
        }
    }

    return (
        <Box sx={{padding: "10px 50px"}}>
            <Box sx={{display: "flex", justifyContent: "between"}}>
                <EmojiPicker icon={icon} onChange={onIconChange}/>
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
                    onClick={handleDeleteAlert}
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
            <Box sx={{  textAlign: "right", position: "relative"}}>
                <Button variant='outLined' size='small'onClick={handleTagCreateForm}><AddOutlinedIcon /></Button>
                <TagCreate isShow={isShowTagCreate} onClick={handleTagCreateForm}/>
            </Box>
            <TagListGroup/>
            <ProjectDeleteAlert isShow={isShowProjectDeleteAlert} projectName={projectName} onClick={handleDeleteAlert} projectId={projectId}/>
        </Box>
    )
}

export default Project;