import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from '../api/authApi';

const Register = () => {
  const handleSubmit = async (e) => {
    // 入力されたform情報を取得
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
      });

      localStorage.setItem("token", res.token);

      console.log("success");
    } catch (err) {
      console.log(err);
    }
  }

  return (
  <>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField 
        fullWidth 
        id="username" 
        label="お名前" 
        margin="normal" 
        name="username"
        required
      />

      <TextField 
        fullWidth 
        id="password" 
        label="パスワード" 
        margin="normal" 
        name="password"
        type="password"
        required
      />

      <TextField 
        fullWidth 
        id="confirmPassword" 
        label="確認用パスワード" 
        margin="normal" 
        name="confirmPassword"
        type="password"
        required
      />

      <LoadingButton
        sx={{ mt: 3, mb: 2}} 
        fullWidth type="submit" 
        loading={false}
        color="primary"
        variant="outlined"
        >
        アカウント作成
      </LoadingButton>
    </Box>
    <Button component={Link} to="/login">
        既にアカウントを持っていますか？ログイン
    </Button>
  </>
  );
}

export default Register;
