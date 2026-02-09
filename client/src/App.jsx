import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Verification from './pages/Verification'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminVerifications from './pages/admin/Verifications'
import AdminPayments from './pages/admin/Payments'
import AdminFeedback from './pages/admin/Feedback'
import Login from './components/Login'
import AdminRegister from './pages/admin/AdminRegister'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {showLogin} = useAppContext()
  const path = useLocation().pathname
  const isDashboardPath = path.startsWith('/owner') || path.startsWith('/admin')


  return (
    <>
      <Toaster />
      {showLogin && <Login/>}
      
      {!isDashboardPath && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/verification' element={<Verification/>} />

        <Route path='/admin-register' element={<AdminRegister/>} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='verifications' element={<AdminVerifications />} />
          <Route path='payments' element={<AdminPayments />} />
          <Route path='feedback' element={<AdminFeedback />} />
        </Route>
        <Route path='/owner' element={<Layout />}>
          <Route index  element={<Dashboard />}/>
          <Route path="add-car"  element={<AddCar />}/>
          <Route path="manage-cars"  element={<ManageCars />}/>
          <Route path="manage-bookings"  element={<ManageBookings />}/>
        </Route>
      </Routes>


      {!isDashboardPath && <Footer />}
      
    </>
  )
}

export default App
