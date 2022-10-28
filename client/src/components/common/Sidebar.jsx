import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { Box, width } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect } from 'react'
import assets from '../../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import memoApi from '../../api/memoApi';

const Sidebar = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const getMemos = async () => {
            try {   
                const res = await memoApi.getAll();
                console.log(res);
            } catch (err) {
                alert(err);
            }
        };
        getMemos();
    }, []);

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
                        <Typography>
                            お気に入り
                        </Typography>
                    </Box>
                </ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    </Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography>
                            プライベート
                        </Typography>
                        <IconButton>
                            <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
                        </IconButton>
                    </Box>
                </ListItemButton>
                <ListItemButton 
                    sx={{pl: "20px"}} 
                    component={Link} to="memo/47474294ry4298"
                >
                    <Typography>
                        🗒仮置きのメモ
                    </Typography>
                </ListItemButton>
                <ListItemButton 
                    sx={{pl: "20px"}} 
                    component={Link} to="memo/47474294ry4298"
                >
                    <Typography>
                        🗒仮置きのメモ
                    </Typography>
                </ListItemButton>
                <ListItemButton 
                    sx={{pl: "20px"}} 
                    component={Link} to="memo/47474294ry4298"
                >
                    <Typography>
                        🗒仮置きのメモ
                    </Typography>
                </ListItemButton>
            </List>
        </Drawer>
    )
}

export default Sidebar;