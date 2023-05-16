
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'
import ChannelList from './pages/channel/ChannelList'



function AuthGuard ({children}){
  // Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {
  

  return (
    
      <BrowserRouter>
      <HeaderBar />
      <Box sx={{m: '25px auto', p:'25px'}}>
        <Routes>
        <Route path="/Login" element={<Login />}/> 

          <Route path="/" element=
          {<AuthGuard> <Home /> </AuthGuard>
          }/>

          <Route path="/payment_method" element=
          {<AuthGuard> <PaymentMethodList /> </AuthGuard>
          }/>

          <Route path="/payment_method/new" element=
          {<AuthGuard> <PaymentMethodForm /> </AuthGuard>
          }/>

        <Route path="/channel" element=
          {<AuthGuard> <ChannelList /> </AuthGuard>
          }/>
          
        </Routes>
      </Box>
      </BrowserRouter>
  )
}

export default App
