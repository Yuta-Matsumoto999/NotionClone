import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TagUpdate from '../menu/TagUpdate';
import { useState } from 'react';

const TagList = (props) => {
    const [anchorEl, setAnchorEl] = useState(null); 

    const handleShowTagUpdate = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseTagUpdate = () => {
        setAnchorEl(null);
    }

    return (
        <Box sx={{margin: "0 20px", textAlign: "left"}} width="25%">
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}    
                    ref={provided.innerRef}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography sx={{padding: "1px 6px", backgroundColor: props.color, borderRadius: "3px"}} fontWeight="700" fontSize="14px">{props.tagName}</Typography>
                        <Box sx={{display: "flex", position: "relative"}}>
                            <Typography>
                                <Button sx={{padding: "2px"}}
                                    aria-owns={anchorEl ? "tagUpdate-menu" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleShowTagUpdate}
                                ><MoreHorizOutlinedIcon fontSize='small'/></Button>
                            </Typography>
                            <TagUpdate anchorEl={anchorEl} onClose={handleCloseTagUpdate} tagId={props.tagId} tagColor={props.tagColor}/>
                            <Button sx={{padding: "2px"}}><AddOutlinedIcon fontSize='small' /></Button>
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