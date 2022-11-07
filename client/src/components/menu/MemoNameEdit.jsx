import { Button, Menu, MenuItem, TextField } from '@mui/material'
import { Box, Container, padding } from '@mui/system'
import React, { useState, useEffect } from 'react';
import memoApi from '../../api/memoApi';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from '../../redux/features/memoSlice';

const MemoNameEdit = (props) => {
    const [memoName, setMemoName] = useState("");
    const memos = useSelector((state) => state.memo.value);
    const dispatch = useDispatch();
    const [currentMemo, setCurrentMemo] = useState();

    useEffect(() => {
        if(Boolean(props.anchorEl)) {
            const memoId = props.memoId;
            const index = memos.findIndex((e) => e._id === memoId);
            const memo = memos[index];
            setCurrentMemo(memo);
            setMemoName(memo.title);
        }
    }, [props.anchorEl]);

    const updateMenuName = async (e) => {
        e.preventDefault();
        const memoId = props.memoId;

        try {
            await memoApi.update(memoId, {title: memoName});

            const temp = [...memos];
            const index = memos.findIndex((e) => e._id === currentMemo._id);

            if(memoName === "") {
                temp[index] = {...temp[index], title: currentMemo.title}
            } else {
                temp[index] = {...temp[index], title: memoName}
            }

            dispatch(setMemo(temp));

            props.onClose();
        } catch (err) {
            alert(err);
        }
    }

    return (
        <Menu
            id="memoNameEdit-menu"
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
            <Box sx={{display: "flex", padding: "5px"}} component="form" onSubmit={updateMenuName}>
                <TextField
                    autoFocus
                    id="memoTitle"
                    name='memoTitle'
                    type="text"
                    value={memoName}
                    onChange={(e) => setMemoName(e.target.value)}
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

export default MemoNameEdit