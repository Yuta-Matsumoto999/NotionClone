import React from 'react';
import { useState } from 'react';
import { Box, Button, Grid, IconButton, Menu, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import MemoUpdate from '../menu/MemoUpdate';
import { makeStyles } from '@mui/styles';

const MemoItem = (props) => {
    const [memoItemHover, setMemoItemHover] = useState(false);
    const [memoId, setMemoId] = useState();
    const [memoUpdateAnchor, setMemoUpdateAnchor] = useState(null);

    const useStyles = makeStyles({
        optionButton: {
            display: "flex",
            minWidth: "5px",
            padding: "5px",
            height: "1.3rem"
        },
        memoItem: {
            minWidth: 275,
            margin: "8px 0",
            boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px",
            backgroundColor: memoItemHover ? "rgba(55, 53, 47, 0.03)" : ""
        },
        memoItemOptions: {
            display: memoItemHover ? "flex" : "none",
            alignItems: "center",
            position: "absolute",
            top: 5,
            right: 5
        },
    });

    const classes = useStyles();

    const hoverMemoItem = (e) => {
        const hoverMemoId = e.currentTarget.id;
        setMemoId(hoverMemoId);
        setMemoItemHover(true);
    }

    const leaveMemoItem = () => {
        setMemoId("");
        setMemoItemHover(false);
    }

    const handleShowMemoUpdate = (e) => {
        setMemoUpdateAnchor(e.currentTarget);
    }

    const handleCloseMemoUpdate = () => {
        setMemoUpdateAnchor(null);
        setMemoItemHover(false);
    }

    return (
        <Card
            id={props.memo._id}
            className={classes.memoItem}
            onMouseEnter={hoverMemoItem}
            onMouseLeave={memoUpdateAnchor == null ? leaveMemoItem : undefined}
        >
            <Box sx={{position: "relative"}}>
                {props.memo.description !== "" &&
                    <Box sx={{backgroundColor: "rgba(55, 53, 47, 0.024)"}}>
                        <Typography sx={{padding: "10px"}}>{props.memo.description}</Typography>                                            
                    </Box>
                }
                <Card className={classes.memoItemOptions}>
                    <Button className={classes. optionButton} color='natural'><ModeEditOutlineIcon fontSize='small'/></Button>
                    <Button
                        onClick={handleShowMemoUpdate}
                        className={classes.optionButton} 
                        color='natural'
                        aria-owns={memoUpdateAnchor ? "memo-update-menu" : undefined}
                        aria-haspopup="true"
                    >
                        <MoreHorizOutlinedIcon fontSize='small'/>
                    </Button>
                    <MemoUpdate anchorEl={memoUpdateAnchor} onClose={handleCloseMemoUpdate} memoId={props.memo._id} memoName={props.memo.title}/>
                </Card>
                <Box sx={{display: "flex", alignItems: "center", padding: "8px", borderTop: "solid 1px #eee"}}>
                    <StickyNote2Icon />
                    <Typography fontWeight="700">{props.memo.title}</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default MemoItem