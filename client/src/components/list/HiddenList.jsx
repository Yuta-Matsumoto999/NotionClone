import { Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@mui/styles';
import memoApi from '../../api/memoApi';
import MemosByHiddenTag from '../menu/MemosByHiddenTag';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';
import TagUpdate from '../menu/TagUpdate';


const HiddenList = (props) => {
    const tags = useSelector((state) => state.tag.value);
    const [hiddenTagAnchor, setHiddenTagAnchor] = useState(null);
    const [memos, setMemos] = useState();

    const useStyles = makeStyles({
        tagName: {
            padding: "1px 5px",
            borderRadius: "3px",
            fontWeight: 700,
            backgroundColor: props.tagColor,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.875rem"
        }
    });

    const classes = useStyles();

    const handleShowHiddenTagContent = async (e) => {
        setHiddenTagAnchor(e.currentTarget);
    }

    const handleCloseHiddenTagContent = () => {
        setHiddenTagAnchor(null);
    }

    return (
        <Box>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}    
                    ref={provided.innerRef}
                >
                    <Box>
                        <ListItemButton
                            aria-owns={hiddenTagAnchor ? "hiddenTag-content-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleShowHiddenTagContent}
                            color="natural"
                            sx={{padding: "5px", borderRadius: "3px", width: "100%"}}
                        >
                        <Typography className={classes.tagName}>{props.tagName}</Typography>
                        </ListItemButton>
                        <MemosByHiddenTag anchorEl={hiddenTagAnchor} onClose={handleCloseHiddenTagContent} tagId={props.tagId} tagColor={props.tagColor} tagName={props.tagName} tagVisible={props.tagVisible}/>
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

export default HiddenList;