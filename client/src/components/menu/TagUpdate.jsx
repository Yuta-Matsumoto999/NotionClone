import { List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DoneIcon from '@mui/icons-material/Done';
import colorApi from '../../api/colorApi';
import DeleteIcon from '@mui/icons-material/Delete';
import tagApi from '../../api/tagApi';
import { useSelector, useDispatch } from "react-redux";
import { setTag } from '../../redux/features/tagSlice';
import { useNavigate } from 'react-router-dom';

const TagUpdate = (props) => {
    const navigate = useNavigate()
;    const [colors, setColors] = useState([]);
    const [currentTag, setCurrentTag] = useState();
    const tags = useSelector((state) => state.tag.value);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const getColors = async () => {
            const colors = await colorApi.getAll();
            setColors(colors);
        };
        getColors();
    },[]);

    useEffect(() => {
        const tagId = props.tagId;
        const index = tags.findIndex((e) => e._id === tagId);
        const tag = tags[index];
        setCurrentTag(tag);
    },[tags]);

    const updateTagColor = async (colorCode) => {
        const tagId = currentTag._id;

        try {
            const updatedTag = await tagApi.update(tagId, {color: colorCode});
            
            let temp = [...tags];
            const index = tags.findIndex((e) => e._id === tagId);
            temp[index] = {...temp[index], color: colorCode};

            dispatch(setTag(temp));

        } catch (err) {
            alert(err);
        }
    }

    return (
            <Menu
                id="tagUpdate-menu"
                anchorEl={props.anchorEl}
                open={Boolean(props.anchorEl)}
                onClose={props.onClose}
                sx={{
                        ".css-6hp17o-MuiList-root-MuiMenu-list": {padding: "4px"},
                    }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <VisibilityOffOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>非表示</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>削除</ListItemText>
                </MenuItem>
                <Divider />
                {colors.map((item, index) => (
                    <MenuItem onClick={ () => updateTagColor(item.colorCode)} key={item._id} sx={{width: "200px", justifyContent: "space-between"}}>
                        <Box sx={{width: "20px", height: "20px", backgroundColor: item.colorCode, marginRight: "10px", WebkitBorderRadius: "3px"}}></Box>
                        <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem", fontWeight: "500"}}}>{item.name}</ListItemText>
                        <Box sx={{display: currentTag.color == item.colorCode ? "block" : "none"}}>
                            <DoneIcon fontSize='small'/>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
    )
}

export default TagUpdate