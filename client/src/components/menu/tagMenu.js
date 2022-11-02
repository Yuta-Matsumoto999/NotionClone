import { List, ListItem, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const tagMenu = () => {
    return (
        <Box sx={{padding: "10px", backGroundColor: "#eee", border: "solid 1px #eee"}}>
            <List>
                <ListItem>
                    <ListItemButton>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <VisibilityOffOutlinedIcon fontSize='small'/>
                            <Typography>非表示</Typography>
                        </Box>
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>非表示</Typography>
                        </Box>
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>非表示</Typography>
                        </Box>
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography>非表示</Typography>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default tagMenu