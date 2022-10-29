import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect, useState } from 'react'

const EmojiPicker = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState();

    useEffect(() => {
        setSelectedEmoji(props.icon);
    }, [props.icon]);

    return (
        <Box>
            <Typography variant="h3" fontWeight="700" sx={{ cursor: "pointer" }}>{selectedEmoji}</Typography>
        </Box>
    )
}

export default EmojiPicker;