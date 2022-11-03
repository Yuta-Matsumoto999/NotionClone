import { LoadingButton } from '@mui/lab';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import projectApi from '../../api/projectApi';
import { setProject } from '../../redux/features/projectSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ProjectDeleteAlert = (props) => {
    const navigate = useNavigate();
    const [deleteProjectNameErrText, setDeleteProjectNameErrText] = useState("");
    const projects = useSelector((state) => state.project.value);
    const dispatch = useDispatch();

    const deleteProject = async (e) => {
        e.preventDefault();
        setDeleteProjectNameErrText("");
        const date = new FormData(e.target);
        const deleteTargetProjectName = date.get("deleteProjectName");
        console.log(deleteTargetProjectName);

        let error = false;

        // 入力必須のvalidation
        if(deleteTargetProjectName === "") {
            error = true;
            setDeleteProjectNameErrText("プロジェクト名を入力してください。");
        }

        if(error) return;

        const projectId = props.projectId;

        try {
            const res = await projectApi.delete(projectId, { deleteProjectName: deleteTargetProjectName });

            const newProjects = projects.filter((e) => e._id !== projectId);

            dispatch(setProject(newProjects));

            navigate("/");
        } catch (err) {
            const errors = err.data.errors;

            errors.forEach((error) => {
                if(error.param == "deleteProjectName") {
                    setDeleteProjectNameErrText(error.msg);
                }
            });
        }
    }

    return (
        <Dialog
            open={props.isShow}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" fontWeight="700">{props.projectName}を削除しますか？</DialogTitle>
            <form onSubmit={deleteProject}>
                <DialogContent>
                    <DialogContentText>
                    このプロジェクト内のすべてのメモが削除されます。<br />
                    削除するには、「{props.projectName}」を入力してください。
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="deleteProjectName"
                    name='deleteProjectName'
                    label="Project Name"
                    type="text"
                    helperText={deleteProjectNameErrText}
                    error={deleteProjectNameErrText !== ""}
                    fullWidth
                    sx={{marginTop: "20px"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} variant="contained" color="natural">
                        キャンセル
                    </Button>
                    <Button type='submit' variant="contained" color="error">
                        削除
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ProjectDeleteAlert