import React from 'react'
import TagList from '../list/TagList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from "react-redux";
import { Box } from '@mui/material';

const TagListGroup = () => {
    const tags = useSelector((state) => state.tag.value);

    const addItems = () => {

    }

    return (
        <DragDropContext>
            <Box sx={{display: "flex"}}>
                {tags.map((item, index) => 
                    item.visible === true &&
                    <TagList 
                    key={index} 
                    id={item._id}
                    tagName={item.name}
                    tagId={item._id}
                    color={item.color}
                    memos={item.memos}
                    AddItems={addItems}
                    />
                )}
            </Box>
        </DragDropContext>
    )
}

export default TagListGroup;