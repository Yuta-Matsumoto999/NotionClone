import { LoadingButton } from '@mui/lab'
import { Button, Menu, MenuItem, TextField } from '@mui/material'
import { Box, Container, padding } from '@mui/system'
import React, { useState, useEffect } from 'react';
import CallMissedOutgoingOutlinedIcon from '@mui/icons-material/CallMissedOutgoingOutlined';
import tagApi from '../../api/tagApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setTag } from '../../redux/features/tagSlice';

const TagNameEdit = (props) => {
    const navigate = useNavigate();
    const projectId = useParams();
    const tags = useSelector((state) => state.tag.value);
    const [currentTag, setCurrentTag] = useState();
    const [tagName, setTagName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const tagId = props.tagId;
        const index = tags.findIndex((e) => e._id === tagId);
        const tag = tags[index];
        setCurrentTag(tag);
        setTagName(tag.name);
    },[tags]);

    // const getTagNameValue = (e) => {
    //     const tagNameValue = e.target.value;
    //     setTagName(tagNameValue);
    // }

    const updateTagName = async (e) => {
        e.preventDefault();

        try {
            const res = await tagApi.update(currentTag._id, { name: tagName });

            let temp = [...tags];
            const index = tags.findIndex((e) => e._id === currentTag._id);
            temp[index] = {...temp[index], name: tagName};

            dispatch(setTag(temp));

            props.onClose();

        } catch (err) {
            alert(err);
        }
    }

    return (
        <Menu
            id="tagNameEdit-menu"
            anchorEl={props.anchorEl}
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
            sx={{
                    ".css-6hp17o-MuiList-root-MuiMenu-list": {padding: "2px"},
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
            <Box sx={{display: "flex", padding: "5px"}} component="form" onSubmit={updateTagName}>
                <TextField
                    autoFocus
                    id="tagName"
                    name='tagName'
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
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

export default TagNameEdit;