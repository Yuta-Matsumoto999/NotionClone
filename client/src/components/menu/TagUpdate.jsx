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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import colorApi from '../../api/colorApi';
import DeleteIcon from '@mui/icons-material/Delete';
import tagApi from '../../api/tagApi';
import { useSelector, useDispatch } from "react-redux";
import { setTag } from '../../redux/features/tagSlice';
import { useNavigate } from 'react-router-dom';
import TagDeleteDialog from '../dialog/TagDeleteDialog';

const TagUpdate = (props) => {
    const navigate = useNavigate();    
    const [colors, setColors] = useState([]);
    const [currentTag, setCurrentTag] = useState();
    const [isShowTagDeleteDialog, setIsShowTagDeleteDialog] = useState(false);
    const tags = useSelector((state) => state.tag.value);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const getColors = async () => {
            if(Boolean(props.anchorEl)) {
                const colors = await colorApi.getAll();
                setColors(colors);
            }
        };
        getColors();
    },[props.anchorEl]);

    useEffect(() => {
        if(Boolean(props.anchorEl)) {
            const tagId = props.tagId;
            const index = tags.findIndex((e) => e._id === tagId);
            const tag = tags[index];
            setCurrentTag(tag);
        }
    },[props.anchorEl]);

    const updateTagColor = async (colorCode) => {
        try {
            const updatedTag = await tagApi.update(currentTag._id, {color: colorCode});
            
            let temp = [...tags];
            const index = tags.findIndex((e) => e._id === currentTag._id);
            temp[index] = {...temp[index], color: colorCode};

            dispatch(setTag(temp));

        } catch (err) {
            alert(err);
        }
    }

    const updateTagVisible = async () => { 
        const visible = props.tagVisible;

        try {
            const updatedTag = await tagApi.update(currentTag._id, {
                visible: !visible
            });

            let temp = [...tags];
            const index = tags.findIndex((e) => e._id === currentTag._id);
            temp[index] = {...temp[index], visible: !visible};

            dispatch(setTag(temp));

        } catch (err) {
            alert(err);
        }
    }

    const handleShowTagDelete = () => {
        setIsShowTagDeleteDialog(!isShowTagDeleteDialog);
    }

    const handleCloseTagDelete = () => {
        setIsShowTagDeleteDialog(false);
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
                <MenuItem onClick={updateTagVisible}>
                    <ListItemIcon>
                        {props.tagVisible
                            ? <VisibilityOffOutlinedIcon fontSize="small" />
                            : <VisibilityIcon fontSize='small' />
                        }
                    </ListItemIcon>
                    {props.tagVisible
                        ? <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>非表示</ListItemText>
                        : <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>表示</ListItemText>
                    }
                </MenuItem>
                <MenuItem onClick={handleShowTagDelete}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>削除</ListItemText>
                    <TagDeleteDialog isShow={isShowTagDeleteDialog} onClose={handleCloseTagDelete} tagName={props.tagName} tagId={props.tagId}/>
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