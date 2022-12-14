import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectApi from '../api/projectApi';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { setProject } from '../redux/features/projectSlice';
import EmojiPicker from "../components/common/EmojiPicker";
import ProjectDeleteDialog from '../components/dialog/ProjectDeleteDialog';
import TagCreate from '../components/menu/TagCreate';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { setTag } from '../redux/features/tagSlice';
import TagList from '../components/list/TagList';
import { setMemo } from '../redux/features/memoSlice';

const Project = () => {
    const { projectId } = useParams();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [tags, setTags] = useState([]);
    const [isShowProjectDeleteDialog, setIsShowProjectDeleteDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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

                let memos = [];

                project.tags.forEach((tag) => {
                    tag.memos.forEach((memo) => {
                        memos.push(memo);
                    })
                });

                dispatch(setMemo(memos));
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

    const handleDeleteDialog = (state) => {
        if(state === false) {
            setIsShowProjectDeleteDialog(false);
        } else {
            setIsShowProjectDeleteDialog(!isShowProjectDeleteDialog);
        }
    }

    const handleShowTagCreate = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseTagCreate = () => {
        setAnchorEl(null);
    }

    return (
        <Box sx={{padding: "10px 50px"}}>
            <Box sx={{display: "flex", justifyContent: "between"}}>
                <EmojiPicker icon={icon} onChange={onIconChange}/>
                <TextField
                    value={projectName}
                    onChange={updateName}
                    placeholder="??????"
                    variant="outlined"
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "2rem", fontWeight: 700 },
                    }}
                />

                <IconButton
                    onClick={handleDeleteDialog}
                    variant="outlined"
                    color="error">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
            <Box>
                <TextField
                    value={projectDescription}
                    onChange={updateDescription}
                    placeholder="??????"
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
                        <Button variant='text' color='natural' sx={{fontWeight: "500"}}>???????????????</Button>
                        <Button variant='text' color='natural' sx={{fontWeight: "500"}}>????????????</Button>
                        <Button variant='text' color='natural'><SearchIcon /></Button>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{  textAlign: "right", position: "relative"}}>
                <Button variant='outLined' size='small'onClick={handleShowTagCreate}><AddOutlinedIcon /></Button>
                <TagCreate
                    aria-owns={anchorEl ? "tagCreate-menu" : undefined}
                    aria-haspopup="true"
                    anchorEl={anchorEl}
                    onClose={handleCloseTagCreate}
                />
            </Box>
            <TagList />
            <ProjectDeleteDialog isShow={isShowProjectDeleteDialog} projectName={projectName} handleClose={handleDeleteDialog} projectId={projectId}/>
        </Box>
    )
}

export default Project;