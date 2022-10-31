import { LoadingButton } from '@mui/lab';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import projectApi from '../../api/projectApi';
import { setProject } from '../../redux/features/projectSlice';

const ProjectDeleteAlert = (props) => {
    const navigate = useNavigate();
    const [deleteProjectNameErrText, setDeleteProjectNameErrText] = useState("");
    const projects = useSelector((state) => state.project.value);
    const dispatch = useDispatch();

    const closeDeleteAlert = () => {
        props.onClick(false);
    }

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
        <Container maxWidth="xs">
            <Box sx={{
                border: "solid 1px #eee",
                width: "100",
                display: props.isShow ? "block" : "none",
                position: "absolute",
                top: "48%",
                left: "48%"
                }}>
                <Box sx={{
                        padding: "10px 5px 10px 15px",
                        backgroundColor: "#eee",
                        width: "100",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }} 
                    width="xs"
                >
                    <Typography fontSize="14px" fontWeight="700">
                        {props.projectName}を削除しますか？
                    </Typography>
                    <Button color='natural' onClick={closeDeleteAlert}>✖︎</Button>
                </Box>
                <Box sx={{
                    backgroundColor: "#fff",
                    padding: "15px",
                }}>
                    <Typography fontSize="14px">
                        「{props.projectName}」で作成したメモは全て削除されます。
                    </Typography>
                    <Typography fontSize="14px">
                        削除するには、「{props.projectName}」を入力してください。
                    </Typography>
                    <Box component="form" sx={{textAlign: "right", marginTop: "20px"}} onSubmit={deleteProject}>
                        <TextField
                            id="deleteProjectName"
                            name="deleteProjectName"
                            type="text"
                            fullWidth
                            placeholder="プロジェクト名を入力"
                            helperText={deleteProjectNameErrText}
                            error={deleteProjectNameErrText !== ""}
                            sx={{
                                ".MuiOutlinedInput-input": { padding: "10px" },
                                marginBottom: "30px"
                            }}>

                        </TextField>
                        <Button variant='contained' color='natural' sx={{margin: "0 10px"}} onClick={closeDeleteAlert}>キャンセル</Button>
                        <LoadingButton
                            type="submit"
                            variant='contained'
                            color='error'
                            sx={{margin: "0 10px"}}>
                                削除
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default ProjectDeleteAlert