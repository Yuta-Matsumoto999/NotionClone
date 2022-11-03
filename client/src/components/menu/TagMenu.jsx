import { List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import colorApi from '../../api/colorApi';
import DeleteIcon from '@mui/icons-material/Delete';
import tagApi from '../../api/tagApi';
import { useSelector, useDispatch } from "react-redux";
import { setTag } from '../../redux/features/tagSlice';

const TagMenu = (props) => {
    const [colors, setColors] = useState([]);
    const tags = useSelector((state) => state.tag.value);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const getColors = async () => {
            const colors = await colorApi.getAll();
            setColors(colors);
        };
        getColors();
    },[]);

    const updateTagColor = async (e) => {
        const colorCode = e.target.id;
        const tagId = props.tagId;

        try {
            const updatedTag = await tagApi.update(tagId, {color: colorCode});
            
            let temp = [...tags];
            const index = tags.findIndex((e) => e._id === tagId);
            temp[index] = {...temp[index], color: colorCode};

            dispatch(setTag(temp));

            props.onClick(false);

        } catch (err) {
            alert(err);
        }
    }

    return (
        <Box sx={{display: props.isShow ? "block" : "none", backGroundColor: "#eee", border: "solid 1px #eee", position: "absolute", top: "30px", left: "-50%"}} width="180px">
            <List sx={{padding: 0}}>
                <Box sx={{borderBottom: "solid 1px #eee", padding: "4px"}}>
                    <ListItemButton sx={{padding: "4px 10px"}}>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                            <VisibilityOffOutlinedIcon fontSize='small'/>
                            <Typography fontSize="14px" fontWeight="500" sx={{marginLeft: "8px"}}>非表示</Typography>
                        </Box>
                    </ListItemButton>
                    <ListItemButton sx={{padding: "4px 10px"}}>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                            <DeleteIcon fontSize='small' />
                            <Typography fontSize="14px" fontWeight="500" sx={{marginLeft: "8px"}}>削除</Typography>
                        </Box>
                    </ListItemButton>
                </Box>
                <Box sx={{padding: "4px"}}>
                    {colors.map((item, index) => (
                        <ListItemButton sx={{padding: "4px 10px"}} key={item._id} onClick={updateTagColor}>
                            <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }} id={item.colorCode}>
                                <Typography fontSize="14px" fontWeight="500">{item.name}</Typography>
                            </Box>
                        </ListItemButton>
                    ))}
                </Box>
            </List>
        </Box>
    )
}

export default TagMenu