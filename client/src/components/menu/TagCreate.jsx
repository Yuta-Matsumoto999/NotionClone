import { LoadingButton } from '@mui/lab'
import { Button, Menu, MenuItem, TextField } from '@mui/material'
import { Box, Container, padding } from '@mui/system'
import React, { useState } from 'react';
import CallMissedOutgoingOutlinedIcon from '@mui/icons-material/CallMissedOutgoingOutlined';
import tagApi from '../../api/tagApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setTag } from '../../redux/features/tagSlice';

const TagCreate = (props) => {
    const navigate = useNavigate();
    const projectId = useParams();
    const tags = useSelector((state) => state.tag.value);
    const dispatch = useDispatch();

    const createTag = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTagName = formData.get("tagName");

        try {
            const res = await tagApi.create(projectId.projectId, { name: newTagName });

            const newTags = [...tags, res];
            dispatch(setTag(newTags));

            props.onClose();

            navigate(`/project/${projectId.projectId}`);

        } catch (err) {
            alert(err);
        }
    }

    return (
        <Menu
            id="tagCreate-menu"
            anchorEl={props.anchorEl}
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
            sx={{
                    ".css-6hp17o-MuiList-root-MuiMenu-list": {padding: "2px"},
                }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            >
            <Box sx={{display: "flex", padding: "5px"}} component="form" onSubmit={createTag}>
                <TextField
                    autoFocus
                    id="tagName"
                    name='tagName'
                    type="text"
                    placeholder='新しいタグ'
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: "5px" },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "1rem" }
                    }}
                />
                <Button 
                    type='submit'
                    variant='contained'
                    size='small'
                >
                        完了
                </Button>
            </Box>
            {/* </Box> */}
        </Menu>
    )
}

export default TagCreate