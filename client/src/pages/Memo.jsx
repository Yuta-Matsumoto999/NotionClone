import { Box, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from "../components/common/EmojiPicker";


function Memo() {
    const navigate = useNavigate();
    const { memoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [isFavoriteShow, setIsFavoriteShow] = useState();
    const memos = useSelector((state) => state.memo.value);
    const dispatch = useDispatch();


    useEffect(() => {
        const getMemo = async () => {
            try {
                const memo = await memoApi.getOne(memoId);
                setTitle(memo.title);
                setDescription(memo.description);
                setIcon(memo.icon);
                setIsFavoriteShow(memo.favorite);
            } catch (err) {
                alert(err);
            }
        }
        getMemo();
    }, [memoId]);

    let timer;
    const timeout = 500;

    const updateTitle = async (e) => {
        clearTimeout(timer);
        const newTitle = e.target.value;

        setTitle(newTitle);

        timer = setTimeout(async () => {
            try {
                const res = await memoApi.update(memoId, { title: newTitle });
                console.log(res);
            } catch (err) {
                alert(err);
            }
        }, timeout);

        let temp = [...memos];
        const index = temp.findIndex((e) => e._id === memoId);
        temp[index] = {...temp[index], title: newTitle };

        dispatch(setMemo(temp));
    }

    const updateDescription = async (e) => {
        clearTimeout(timer);
        const newDescription = e.target.value;
        setDescription(newDescription);

        timer = setTimeout(async () => {
            try {
                await memoApi.update(memoId, { description: newDescription });
            } catch (err) {
                alert(err);
            }
        }, timeout);

        let temp = [...memos];
        const index = temp.findIndex((e) => e._id === memoId);
        temp[index] = {...temp[index], description: newDescription };

        dispatch(setMemo(temp));
    }

    const deleteMemo = async () => {
        try {
            const deletedMemo = await memoApi.delete(memoId);
            console.log(deletedMemo);

            // ????????????????????????????????????????????????????????????
            const newMemos = memos.filter((e) => e._id !== memoId);

            if(newMemos.length === 0) {
                // ???????????????????????????????????????????????????????????????????????????
                navigate("/memo");
            } else {
                // ?????????????????????????????????????????????????????????????????????????????????????????????
                navigate(`/memo/${newMemos[0]._id}`);
            }

            // ????????????????????????memos????????????????????????
            dispatch(setMemo(newMemos));

        }  catch (err) {
            alert(err);
        }
    }

    const onIconChange = async (newIcon) => {
        // ????????????????????????????????????memos????????????
        let temp = [...memos];

        // ?????????????????????index?????????
        const index = temp.findIndex((e) => e._id === memoId);

        // index???memos??????????????????????????????????????????????????????icon???????????????
        temp[index] = {...temp[index], icon: newIcon };

        setIcon(newIcon);
        dispatch(setMemo(temp));

        // DB????????????????????????
        try {
            await memoApi.update(memoId, { icon: newIcon });
        } catch (err) {
            alert(err);
        }
    }

    const handleMemoFavorite = async () => {
        try {
            await memoApi.update(memoId, { favorite: !isFavoriteShow });
        } catch (err) {
            alert(err);
        }

        let temp = [...memos];
        const index = temp.findIndex((e) => e._id === memoId);
        temp[index] = { ...temp[index], favorite: !isFavoriteShow };
        dispatch(setMemo(temp));

        setIsFavoriteShow(!isFavoriteShow);
    }

    return (
        <>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
        }}>
            <IconButton onClick={handleMemoFavorite} sx={{display: isFavoriteShow ? "none" : "block"}}>
                <StarBorderOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleMemoFavorite} sx={{display: isFavoriteShow ? "block" : "none"}}>
                <StarOutlinedIcon />
            </IconButton>
            <IconButton
                onClick={deleteMemo}
                variant="outlined"
                color="error">
                <DeleteOutlinedIcon />
            </IconButton>
        </Box>
        <Box sx={{padding: "10px 50px"}}>
            <Box>
                <EmojiPicker icon={icon} onChange={onIconChange}/>
                <TextField
                    value={title}
                    onChange={updateTitle}
                    placeholder="??????"
                    variant="outlined"
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "2rem", fontWeight: 700 },
                    }}
                />

                <TextField
                    value={description}
                    onChange={updateDescription}
                    placeholder="??????"
                    variant="outlined"
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-input": { padding: 0 },
                        ".MuiOutlinedInput-notchedOutline" : { border: "none" },
                        ".MuiOutlinedInput-root" : { fontSize: "1rem" }
                    }}
                />
            </Box>
        </Box>
        </>
    )
}

export default Memo