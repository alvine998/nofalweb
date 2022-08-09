import { BrowserRouter as BRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/main/dashboard';
import Login from './pages/login';
import Verification from './pages/verification';
import Register from './pages/register';

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import Profile from './pages/main/settings/profile';
import ErrorNotFounds from './pages/404';
import BannedUser from './pages/main/user/banned';
import UserPage from './pages/main/user';
import ProductPage from './pages/main/product';
import VerificationProduct from './pages/main/product/verification';
import Security from './pages/main/settings/security';
import VerificationProgress from './pages/main/progress/verification';
import VerificationServices from './pages/main/services/verification';
import ProgressPage from './pages/main/progress';
import ServicesPage from './pages/main/services';

function App() {
  return (
    <BRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/verification"} element={<Verification />} />
        <Route path={"/main/dashboard"} element={<Dashboard />} />
        <Route path={"/main/settings/profile"} element={<Profile />} />
        <Route path={"/main/settings/security"} element={<Security />} />
        <Route path={"/main/user/banned"} element={<BannedUser />} />
        <Route path={"/main/user"} element={<UserPage />} />

        <Route path={"/main/product"} element={<ProductPage />} />
        <Route path={"/main/progress"} element={<ProgressPage />} />
        <Route path={"/main/services"} element={<ServicesPage />} />
        <Route path={"/main/product/verification"} element={<VerificationProduct />} />
        <Route path={"/main/progress/verification"} element={<VerificationProgress />} />
        <Route path={"/main/services/verification"} element={<VerificationServices />} />
        <Route path='*' element={<ErrorNotFounds/>}/>
      </Routes>
    </BRouter>
  );
}

export default App;
