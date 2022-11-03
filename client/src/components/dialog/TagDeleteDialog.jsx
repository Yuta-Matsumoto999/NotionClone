import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import tagApi from '../../api/tagApi';
import { setTag } from '../../redux/features/tagSlice';

const TagDeleteDialog = (props) => {
    const tags = useSelector((state) => state.tag.value);
    const dispatch = useDispatch(); 

    const deleteTag = async () => {
        const tagId = props.tagId;

        try {
            await tagApi.delete(tagId);
            const newTags = tags.filter((e) => e._id !== tagId);

            dispatch(setTag(newTags));

        } catch (err) {
            alert(err);
        }
    }

    return (
        <Dialog
                open={props.isShow}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" fontWeight="700">{props.tagName}を削除しますか？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    このタグ内のメモをすべて削除してもよろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} variant="contained" color="natural">
                        キャンセル
                    </Button>
                    <Button type='submit' variant="contained" color="error" onClick={deleteTag}>
                        削除
                    </Button>
                </DialogActions>
        </Dialog>
    )
}

export default TagDeleteDialog;