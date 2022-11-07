import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import HiddenList from '../listItem/HiddenTagItem';
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from '@mui/material';

const HiddenTagListGroup = () => {
  const tags = useSelector((state) => state.tag.value);

  return (
    <Box sx={{width: "250px", margin: "0 20px"}}>
      <Typography fontSize="14px" sx={{marginBottom: "10px"}} color="rgba(55, 53, 47, 0.5)">非表示のタグ</Typography>
      <DragDropContext>
              <Box>
                  {tags.map((item, index) => 
                      item.visible === false &&
                      <HiddenList 
                      key={index} 
                      id={item._id}
                      tagName={item.name}
                      tagId={item._id}
                      tagColor={item.color}
                      tagVisible={item.visible}
                      />
                  )}
              </Box>
      </DragDropContext>
    </Box>
  )
}

export default HiddenTagListGroup;