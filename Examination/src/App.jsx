import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import View from './components/View';
export default function App() {
  return (
    <BrowserRouter>
      
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/view' element={<View/>} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>

        </Route>
      </Routes> 

    </BrowserRouter>
  );
}
