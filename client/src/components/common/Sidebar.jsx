import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { Box, width } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from 'react'
import assets from '../../assets/index';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const { memoId } = useParams();
    const user = useSelector((state) => state.user.value);
    const memos = useSelector((state) => state.memo.value);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const getMemos = async () => {
            try {   
                const res = await memoApi.getAll();
                dispatch(setMemo(res));
            } catch (err) {
                alert(err);
            }
        };
        getMemos();
    }, []);

    useEffect(() => {
        const activeIndex = memos.findIndex((e) => e._id === memoId);
        setActiveIndex(activeIndex);
    }, [navigate]);

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
                {memos.map((item, index) => (
                    <ListItemButton 
                        sx={{pl: "20px"}} 
                        component={Link} to={`/memo/${item._id}`}
                        key={item._id}
                        selected={index === activeIndex}
                    >
                        <Typography>
                            {item.icon} {item.title}
                        </Typography>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;