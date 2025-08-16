import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import Menu from './pages/Menu.jsx'
import PrivateRouter from './components/PrivateRouter.jsx'
import Setting from './components/menuComponents/Setting.jsx'
import UploadArt from './components/menuComponents/UploadArt.jsx'
import Dashboard from './components/menuComponents/Dashboard.jsx'
import Profile from './components/menuComponents/Profile.jsx'
import UpdateProfile from './components/UpdateProfile.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ShowArtDetail from './pages/ShowArtDetail.jsx'

export default function App() {
  return (
    <div className='bg-gray-50 min-h-100'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/art-detail/:artworkId' element={<ShowArtDetail/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/upload-art' element={<UploadArt/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/update-profile' element={<UpdateProfile/>}/>
        </Route>
      </Routes>
    </div>
  )
}
