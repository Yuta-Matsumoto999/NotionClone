import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';

const EmojiPicker = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState();
    const [isShowPicker, setIsShowPicker] = useState(false);

    useEffect(() => {
        setSelectedEmoji(props.icon);
    }, [props.icon]);

    const showPicker = () => {
        setIsShowPicker(!isShowPicker);
    }

    const selectEmoji = (e) => {
        // 絵文字固有のunifiedコードを取得
        // -で繋がっているコードもあるため、分割する
        const emojiCode = e.unified.split("-");

        // 取得したunifiedコードを1つずつ配列へ入れる
        let codesArray = [];
        emojiCode.forEach((el) => codesArray.push("0x" + el));

        // unifiedコードの配列を展開し、絵文字に変換する
        const emoji = String.fromCodePoint(...codesArray);

        setIsShowPicker(false);
    }

    return (
        <Box>
            <Typography variant="h3" fontWeight="700" sx={{ cursor: "pointer", marginBottom: "15px" }} onClick={showPicker}>{selectedEmoji}</Typography>
            <Box sx={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex: "100"}}>
                <Picker onEmojiSelect={selectEmoji} />
            </Box>
        </Box>
    )
}

export default EmojiPicker;