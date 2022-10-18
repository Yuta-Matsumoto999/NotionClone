import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from '../api/authApi';
import { useState } from 'react';

const Register = () => {

  // validationエラーメッセージ用
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");

  // Api通信中のLoading処理用
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validationエラーメッセージの初期化
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    // 入力されたform情報を取得
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    // validation処理開始

    let error = false;

    if(username === "") {
      error =  true;
      setUsernameErrText("名前を入力してください。");
    }

    if(password === "") {
      error =  true;
      setPasswordErrText("パスワードを入力してください。");
    }

    if(confirmPassword === "") {
      error =  true;
      setConfirmErrText("確認用パスワードを入力してください。");
    }

    if(password !== confirmPassword) {
      error =  true;
      setConfirmErrText("パスワードと確認用パスワードが一致しません。");
    }

    // validationエラーが発生した場合には、新規登録処理をストップする。 
    if(error) return;

    // Loadingを開始
    setLoading(true);

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
      });

      localStorage.setItem("token", res.token);

      console.log("success");

      // Loadingを終了する
      setLoading(false);

    } catch (err) {
      console.log(err);
      // サーバーからのvalidationエラーメッセージをセット
      const errors = err.data.errors;

      errors.forEach((error) => {
        if(error.param == "username") {
          setUsernameErrText(error.msg);
        }

        if(error.param == "password") {
          setPasswordErrText(error.msg);
        }

        if(error.param == "confirmPassword") {
          setConfirmErrText(error.msg);
        }
      });

      // Loadingを終了する
      setLoading(false);
    }
  }

  return (
  <>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField 
        fullWidth 
        id="username" 
        label="お名前" 
        margin="normal" 
        name="username"
        required
        helperText={usernameErrText}
        error={usernameErrText !== ""}
      />

      <TextField 
        fullWidth 
        id="password" 
        label="パスワード" 
        margin="normal" 
        name="password"
        type="password"
        required
        helperText={passwordErrText}
        error={passwordErrText !== ""}
      />

      <TextField 
        fullWidth 
        id="confirmPassword" 
        label="確認用パスワード" 
        margin="normal" 
        name="confirmPassword"
        type="password"
        required
        helperText={confirmErrText}
        error={confirmErrText !== ""}
      />

      <LoadingButton
        sx={{ mt: 3, mb: 2}} 
        fullWidth type="submit" 
        loading={loading}
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
