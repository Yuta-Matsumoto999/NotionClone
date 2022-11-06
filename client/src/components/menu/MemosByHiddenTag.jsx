import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import memoApi from '../../api/memoApi';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TagUpdate from './TagUpdate';
import { makeStyles } from '@mui/styles';

const MemosByHiddenTag = (props) => {
    const [hiddenMemos, setHiddenMemos] = useState();
    const tagId = props.tagId;
    
    useEffect(() => {
        const getMemoByHiddenTag = async () => {
            if(Boolean(props.anchorEl)) {
                try {
                    const hiddenMemosByTagId = await memoApi.getAllByTagId(tagId);
                    setHiddenMemos(hiddenMemosByTagId);
                } catch (err) {
                    alert(err);
                }
            }
        }
        getMemoByHiddenTag();
    }, [props.anchorEl]);

    const useStyles = makeStyles({
        tagNameButton: {
            padding: "1px",
            borderRadius: "3px",
            fontWeight: 700,
            backgroundColor: props.tagColor,
            '&:hover': {
                backgroundColor: props.tagColor
            },
            height: "1.3rem"
        },
        tagOptionButton: {
            display: "flex",
            minWidth: "5px",
            padding: "5px",
            height: "1.3rem"
        },
        tagName: {
            padding: "1px",
            borderRadius: "3px",
            fontWeight: 700,
            fontSize: "0.875rem",
            fontWeight: "700",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "64px",
            backgroundColor: props.tagColor,
        },
    });

    const classes = useStyles();

    const [tagUpdateAnchor, setTagUpdateAnchor] = useState(null); 

    const [tagNameAnchor, setTagNameAnchor] = useState(null);

    const handleShowTagUpdate = (e) => {
        setTagUpdateAnchor(e.currentTarget);
    }

    const handleCloseTagUpdate = () => {
        setTagUpdateAnchor(null);
    }

    return (
        <Menu
            id="hidden-memos-menu"
            anchorEl={props.anchorEl}
            open={Boolean(props.anchorEl)}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: "300px", borderRadius: "3px", padding: "10px"}}>
                <Box>
                    <Typography className={classes.tagName}>{props.tagName}</Typography>
                </Box>
                <Box sx={{display: "flex"}}>
                    <Button
                        aria-owns={tagUpdateAnchor ? "tagUpdate-menu" : undefined}
                        aria-haspopup="true"
                        onClick={handleShowTagUpdate}
                        className={classes.tagOptionButton}
                        color="natural"
                    ><MoreHorizOutlinedIcon fontSize='small'/></Button>
                    <TagUpdate anchorEl={tagUpdateAnchor} onClose={handleCloseTagUpdate} tagId={props.tagId} tagColor={props.tagColor} tagName={props.tagName} tagVisible={props.tagVisible}/>
                    <Button className={classes.tagOptionButton} color="natural"><AddOutlinedIcon fontSize='small' /></Button>
                </Box>
            </Box>
        </Menu>
    )
}

export default MemosByHiddenTag;