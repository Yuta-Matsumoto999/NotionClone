import React from 'react'
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import memoApi from "../api/memoApi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from '../redux/features/memoSlice';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const memos = useSelector((state) => state.memo.value);
    const dispatch  = useDispatch();

    const createMemo = async () => {
        try {
            setLoading(true);
            const res = await memoApi.create();

            // 作成したメモを既存のメモへ追加
            const newMemos = [res, ...memos];
            dispatch(setMemo(newMemos));

            navigate(`/memo/${res._id}`);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <LoadingButton 
                variant="outlined" 
                color="primary"
                onClick={() => createMemo()}
                loading={loading}
            >
                最初のメモを作成
            </LoadingButton>
        </Box>
        )
}

export default Home;