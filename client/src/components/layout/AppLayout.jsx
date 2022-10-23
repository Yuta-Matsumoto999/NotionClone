import { Box } from '@mui/material';
import { Container, flexbox } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/features/userSlice';

const AppLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ページ遷移が発生する度に更新される処理を記述
    useEffect(() => {
        // JWTを持っているか確認する
        const checkAuth = async () => {
            // 認証チェック
            const user = await authUtils.isAuthenticated();

            // 末認証のユーザーはLoginへリダレクト
            if(!user) {
                navigate("/login");
            } else {
                // ユーザーを保存する
                dispatch(setUser(user));
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar/>
                <Box sx ={{ flexGrow: 1, p: 1, width: "max-content" }}>
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default  AppLayout;
