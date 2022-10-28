import { Box, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';


function Memo() {
    const { memoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const getMemo = async () => {
            try {
                const memo = await memoApi.getOne(memoId);
                setTitle(memo.title);
                setDescription(memo.description);
            } catch (err) {
                alert(err);
            }
        }
        getMemo();
    }, [memoId]);

    return (
        <>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
        }}>
            <IconButton>
                <StarBorderOutlinedIcon />
            </IconButton>
            <IconButton variant="outlined" color="error">
                <DeleteOutlinedIcon />
            </IconButton>
        </Box>
        <Box sx={{padding: "10px 50px"}}>
            <TextField placeholder="無題" variant="outlined" fullWidth sx={{
                ".MuiOutlinedInput-input": { padding: 0 },
                ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                ".MuiOutlinedInput-root" : { fontSize: "2rem", fontWeight: 700 },
            }}
            value={title}
            />
            <TextField placeholder="追加" variant="outlined" fullWidth sx={{
                ".MuiOutlinedInput-input": { padding: 0 },
                ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                ".MuiOutlinedInput-root" : { fontSize: "1rem" }
            }}
            value={description}
            />
        </Box>
        </>
    )
}

export default Memo