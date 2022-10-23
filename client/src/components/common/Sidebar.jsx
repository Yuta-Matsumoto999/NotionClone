import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { Box, width } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React from 'react'
import assets from '../../assets/index';

const Sidebar = () => {
    return (
        <Drawer container={window.document.body} variant="permanent" open={true} sx={{width: 250, height: "100vh"}}>
            <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontWeight="700">
                            notionUser5
                        </Typography>
                        <IconButton>
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
                            <AddBoxOutlinedIcon fontsize="small"></AddBoxOutlinedIcon>
                        </IconButton>
                    </Box>
                </ListItemButton>
            </List>
        </Drawer>
    )
}

export default Sidebar;