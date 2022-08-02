import { BrowserRouter as BRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/main/dashboard';
import Login from './pages/login';
import Verification from './pages/verification';
import Register from './pages/register';

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import Profile from './pages/main/settings/profile';
import ErrorNotFounds from './pages/404';

function App() {
  return (
    <BRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/verification"} element={<Verification />} />
        <Route path={"/main/dashboard"} element={<Dashboard />} />
        <Route path={"/main/settings/profile"} element={<Profile />} />
        <Route path='*' element={<ErrorNotFounds/>}/>
      </Routes>
    </BRouter>
  );
}

export default App;
