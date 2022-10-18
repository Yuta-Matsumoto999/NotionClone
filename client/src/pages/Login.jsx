import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from '../api/authApi';
import { useState } from 'react';

const Login = () => {

  const navigate = useNavigate();

  // validationエラーメッセージ用
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  // Api通信中のLoading処理用
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validationエラーメッセージの初期化
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力されたform情報を取得
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    console.log(username);
    console.log(password);

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

    // validationエラーが発生した場合には、ログイン処理をストップする。 
    if(error) return;

    // Loadingを開始
    setLoading(true);

    // ログインAPIを叩く
    try {
      const res = await authApi.login({
        username,
        password
    });

      localStorage.setItem("token", res.token);

      console.log("ログインに成功しました。");

      // Loadingを終了する
      setLoading(false);

      // Homeへリダイレクト
      navigate("/");

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
        disabled={loading}
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
        disabled={loading}
      />

      <LoadingButton
        sx={{ mt: 3, mb: 2}} 
        fullWidth type="submit" 
        loading={loading}
        color="primary"
        variant="outlined"
        >
        ログイン
      </LoadingButton>
    </Box>
    <Button component={Link} to="/register">
        アカウントを持っていませんか？新規作成
    </Button>
  </>
  );
}

export default Login;
