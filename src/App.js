import { BrowserRouter as BRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/main/dashboard';
import Login from './pages/login';
import Verification from './pages/verification';
import Register from './pages/register';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
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
import Home from './pages';
import ListUser from './pages/main/pengguna';
import ListMails from './pages/main/mailreq';
import RegisPenyimpanan from './pages/main/registrasi';
import Profil from './pages/main/profil';
import EditProfil from './pages/main/profil/setting';
import PurchaseRequest from './pages/main/purchase';
import Helpdesk from './pages/main/helpdesk';
import ListMailReq from './pages/main/mailreq/list';
import JobList from './pages/main/pengguna/jobList';
import ListRegisPenyimpanan from './pages/main/registrasi/list';
import Help from './pages/help';
import UserList from './pages/main/user';

function App() {
  return (
    <BRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/help"} element={<Help />} />
        <Route path={"/verification"} element={<Verification />} />
        <Route path={"/main/dashboard"} element={<Dashboard />} />
        <Route path={"/main/settings/profile"} element={<Profile />} />
        <Route path={"/main/settings/security"} element={<Security />} />
        <Route path={"/main/user/banned"} element={<BannedUser />} />
        <Route path={"/main/user"} element={<UserPage />} />
        <Route path={"/main/user/list"} element={<ListUser />} />
        <Route path={"/main/mail/list"} element={<ListMails />} />
        <Route path={"/main/regis/penyimpanan"} element={<RegisPenyimpanan />} />
        <Route path={"/main/purchase/request"} element={<PurchaseRequest />} />
        <Route path={"/main/work/helpdesk"} element={<Helpdesk />} />

        <Route path={"/main/work/user/list"} element={<UserList />} />
        <Route path={"/main/work/mail/list"} element={<ListMailReq />} />
        <Route path={"/main/work/job/list"} element={<JobList />} />
        <Route path={"/main/work/regis/list"} element={<ListRegisPenyimpanan />} />

        {/* Print */}
        {/* <Route path={"/main/job/print"} element={<JobPrint />} /> */}

        <Route path={"/main/profil/user"} element={<Profil />} />
        <Route path={"/main/profil/edit"} element={<EditProfil />} />

        <Route path={"/main/product"} element={<ProductPage />} />
        <Route path={"/main/progress"} element={<ProgressPage />} />
        <Route path={"/main/services"} element={<ServicesPage />} />
        <Route path={"/main/product/verification"} element={<VerificationProduct />} />
        <Route path={"/main/progress/verification"} element={<VerificationProgress />} />
        <Route path={"/main/services/verification"} element={<VerificationServices />} />
        <Route path='*' element={<ErrorNotFounds />} />
      </Routes>
    </BRouter>
  );
}

export default App;
