import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import memoApi from '../../api/memoApi';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from '../../redux/features/memoSlice';

const MemoUpdate = (props) => {
    const memos = useSelector((state) => state.memo.value);
    const dispatch = useDispatch();

    const deleteMemo = async () => {
        const memoId = props.memoId;

        try {
            await memoApi.delete(memoId);

            const newMemos = memos.filter((e) => e._id !== memoId);

            console.log(newMemos);

            dispatch(setMemo(newMemos));

            props.onClose();

        } catch (err) {
            alert(err);
        }
    }

    return (
        <Menu
                id='memo-update-menu'
                anchorEl={props.anchorEl}
                open={Boolean(props.anchorEl)}
                onClose={props.onClose}
                sx={{
                        ".css-6hp17o-MuiList-root-MuiMenu-list": {padding: "4px"},
                    }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={deleteMemo}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                        <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>削除</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ModeEditOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>名前の変更</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ModeEditOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{".css-10hburv-MuiTypography-root": {fontSize: "0.88rem"}}}>複製</ListItemText>
                </MenuItem>
            </Menu>
    )
}

export default MemoUpdate;