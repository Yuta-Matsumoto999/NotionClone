import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import TagUpdate from '../menu/TagUpdate';
import { useState } from 'react';
import TagNameEdit from '../menu/TagNameEdit';
import { makeStyles } from '@mui/styles';
import memoApi from '../../api/memoApi';

const TagList = (props) => {
    const useStyles = makeStyles({
        tagNameButton: {
            padding: "1px",
            borderRadius: "3px",
            fontWeight: 700,
            backgroundColor: props.tagColor,
            '&:hover': {
                backgroundColor: props.tagColor
            },
            height: "1.3rem",
        },
        tagOptionButton: {
            display: "flex",
            minWidth: "5px",
            padding: "5px",
            height: "1.3rem"
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

    const handleShowTagNameEdit = (e) => {
        setTagNameAnchor(e.currentTarget);
    }

    const handleCloseTagNameEdit = () => {
        setTagNameAnchor(null);
    }

    const addMemo = async () => {
        const tagId = props.tagId;
        const newMemo = await memoApi.create(tagId);
        console.log(newMemo);
    }

    return (
        <Box sx={{margin: "0 20px", textAlign: "left"}} width="300px">
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}    
                    ref={provided.innerRef}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
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
                            <Button className={classes.tagOptionButton} color="natural" onClick={addMemo}><AddOutlinedIcon fontSize='small' /></Button>
                        </Box>
                    </Box>
                    {props.memos.map((item, index) => (
                    <Draggable key={item._id} draggableId={item.tag} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Card sx={{ minWidth: 275, margin: "8px 0", boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px"}}>
                                    <Box>
                                        {item.description !== "" &&
                                            <Box sx={{backgroundColor: "#f5f5f5"}}>
                                                <Typography sx={{padding: "10px"}}>{item.description}</Typography>                                            
                                            </Box>
                                        }
                                        <Box sx={{display: "flex", alignItems: "center", padding: "8px", borderTop: "solid 1px #eee"}}>
                                            <StickyNote2Icon />
                                            <Typography fontWeight="700">{item.title}</Typography>
                                        </Box>
                                    </Box>
                                </Card>
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