import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { Box, width } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from 'react'
import assets from '../../assets/index';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import projectApi from "../../api/projectApi";
import { setProject } from '../../redux/features/projectSlice';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const user = useSelector((state) => state.user.value);
    const projects = useSelector((state) => state.project.value);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const getProjects = async () => {
            try {   
                const res = await projectApi.getAll();
                dispatch(setProject(res));
            } catch (err) {
                alert(err);
            }
        };
        getProjects();
    }, []);

    useEffect(() => {
        const activeIndex = projects.findIndex((e) => e._id === projectId);
        setActiveIndex(activeIndex);
    }, [navigate]);

    const addProject = async () => {
        try {
            const newProject = await projectApi.create();
            console.log(newProject);
            const newProjects = [newProject, ...projects];
            dispatch(setProject(newProjects));
            navigate(`project/${newProject._id}`);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <Drawer container={window.document.body} variant="permanent" open={true} sx={{width: 250, height: "100vh"}}>
            <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontWeight="700">
                            {user.username}
                        </Typography>
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon></LogoutOutlinedIcon>
                        </IconButton>
                    </Box>
                </ListItemButton>
                <Box sx={{ paddingTop: "10px" }}></Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography fontWeight="700">
                            プロジェクト
                        </Typography>
                        <AddBoxOutlinedIcon onClick={addProject}/>
                    </Box>
                </ListItemButton>
                {projects.map((item, index) => (
                    <ListItemButton 
                        sx={{pl: "20px"}} 
                        component={Link} to={`/project/${item._id}`}
                        key={item._id}
                        selected={index === activeIndex}
                    >
                        <Typography>
                            {item.icon} {item.name}
                        </Typography>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;