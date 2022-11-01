import { LoadingButton } from '@mui/lab'
import { Button, TextField } from '@mui/material'
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

            props.onClick(false);

            navigate(`/project/${projectId.projectId}`);

        } catch (err) {
            alert(err);
        }
    }

    return (
            <Box component="form" sx={{
                display: props.isShow ? "flex" : "none",
                justifyContent:"space-between", 
                width: "350px",
                position: "absolute", 
                top: "40px", 
                right: "0", 
                padding: "5px", 
                backgroundColor: "#eee",
                zIndex: "100"
                }}
                onSubmit={createTag}
            >
                <TextField
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
                    >
                </TextField>
                <Button 
                    type='submit'
                    variant='contained'
                    size='small'
                >
                        完了
                </Button>
            </Box>
    )
}

export default TagCreate