import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TagUpdate from '../menu/TagUpdate';
import { useState } from 'react';
import TagNameEdit from '../menu/TagNameEdit';
import { makeStyles } from '@mui/styles';

const TagList = (props) => {
    const buttonStyles = makeStyles({
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
        }
    });

    const classes = buttonStyles();

    const [tagUpdateAnchor, setTagUpdateAnchor] = useState(null); 

    const [tagNameAnchor, setTagNameAnchor] = useState(null);

    const handleShowTagUpdate = (e) => {
        setTagUpdateAnchor(e.currentTarget);
    }

    const handleCloseTagUpdate = () => {
        setTagUpdateAnchor(null);
    }

    const handleShowTagNameEdit = (e) => {
        setTagNameAnchor(e.currentTarget);
    }

    const handleCloseTagNameEdit = () => {
        setTagNameAnchor(null);
    }

    return (
        <Box sx={{margin: "0 20px", textAlign: "left"}} width="300px">
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}    
                    ref={provided.innerRef}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Button 
                                className={classes.tagNameButton}
                                fontWeight="700" 
                                fontSize="0.875rem"
                                aria-owns={tagNameAnchor ? "tagNameEdit-menu" : undefined}
                                aria-haspopup="true"
                                onClick={handleShowTagNameEdit}
                                color="natural"
                        >
                            {props.tagName}
                        </Button>
                        <TagNameEdit anchorEl={tagNameAnchor} onClose={handleCloseTagNameEdit} tagName={props.tagName} tagId={props.tagId}/>
                        <Box sx={{display: "flex", position: "relative"}}>
                            <Typography>
                                <Button
                                    aria-owns={tagUpdateAnchor ? "tagUpdate-menu" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleShowTagUpdate}
                                    className={classes.tagOptionButton}
                                    color="natural"
                                ><MoreHorizOutlinedIcon fontSize='small'/></Button>
                            </Typography>
                            <TagUpdate anchorEl={tagUpdateAnchor} onClose={handleCloseTagUpdate} tagId={props.tagId} tagColor={props.tagColor} tagName={props.tagName} tagVisible={props.tagVisible}/>
                            <Button className={classes.tagOptionButton} color="natural"><AddOutlinedIcon fontSize='small' /></Button>
                        </Box>
                    </Box>
                    {props.memos.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.tag} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box sx={{display: "flex", border: "solid 1px #eee", borderRadius: "3px", padding: "1px 3px"}}>
                                    <Typography fontWeight="700">{item.title}</Typography>
                                </Box>
                            </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                    {/* <button className="Add-item-btn" onClick={() => props.onAddItems(props.id)}></button> */}
                </div>
                )}
            </Droppable>
        </Box>
    )
}

export default TagList;