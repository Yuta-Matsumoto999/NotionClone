import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from "@mui/material/colors";
import Home from './pages/Home';
import Memo from "./pages/Memo";
import Project from "./pages/Project";

function App() {

  const Theme = createTheme({
    palette: { primary: blue },
  });

  return ( 
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}/>
            <Route path="project" element={<Home />}/>
            <Route path="project/:projectId" element={<Project />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
