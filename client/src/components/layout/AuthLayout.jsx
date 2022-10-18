import { Box } from '@mui/material';
import { Container, flexbox } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from '../../utils/authUtils';

const AuthLayout = () => {

    const navigate = useNavigate();

    // ページ遷移が発生する度に更新される処理を記述
    useEffect(() => {
        // JWTを持っているか確認する
        const checkAuth = async () => {
            // 認証チェック
            const isAuth = await authUtils.isAuthenticated();

            console.log(isAuth);

            // 認証済みであればHomeへリダレクト
            if(isAuth) {
                navigate("/");
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box 
                sx={{
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <img src={notionLogo} alt="" 
                        style={{ width: 100, height: 100, marginBottom: 3 }}/>
                    Notion Clone開発
                </Box>
                <Outlet />
            </Container>
        </div>
    )
}

export default  AuthLayout;
