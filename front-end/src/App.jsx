import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home  from './Pages/Home.jsx'
import Login from './Pages/Login.jsx';
import Account from './Pages/Account.jsx';
import SignUp from './Pages/SignUp.jsx';
SignUp

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            
                <Route index path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account/:AccountId" element={<Account />} />
                <Route path='/signup' element={<SignUp />}/>

            
        </Routes>
        </BrowserRouter>
    );
};

export default App;

