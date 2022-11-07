import React from 'react'
import TagItem from '../listItem/TagItem';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from "react-redux";
import { Box } from '@mui/material';
import HiddenList from './HiddenList';

const TagList = () => {
    const tags = useSelector((state) => state.tag.value);

    const addItems = () => {

    }

    return (
        <DragDropContext>
            <Box sx={{display: "flex"}}>
                {tags.map((item, index) => 
                    item.visible === true &&
                    <TagItem 
                    key={index} 
                    id={item._id}
                    tagName={item.name}
                    tagId={item._id}
                    tagColor={item.color}
                    tagVisible={item.visible}
                    memos={item.memos}
                    AddItems={addItems}
                    />
                )}
                <HiddenList />
            </Box>
        </DragDropContext>
    )
}

export default TagList;