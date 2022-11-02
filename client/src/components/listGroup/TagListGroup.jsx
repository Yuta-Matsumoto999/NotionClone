import React from 'react'
import TagList from '../list/TagList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from "react-redux";
import { Box } from '@mui/material';

const TagListGroup = () => {
    const tags = useSelector((state) => state.tag.value);
    console.log(tags);

    const addItems = () => {

    }

    return (
        <DragDropContext>
            <Box sx={{display: "flex"}}>
                {tags.map((value, index) => 
                    <TagList 
                    key={index} 
                    id={value._id}
                    tagName={value.name}
                    color={value.color}
                    memos={value.memos}
                    AddItems={addItems}
                    />
                )}
            </Box>
        </DragDropContext>
    )
}

export default TagListGroup;