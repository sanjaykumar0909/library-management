import React, { useState } from 'react';
import '../styles/LoginPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const FormComponent = () => {
    const navigate= useNavigate()
    let [formData, modForm]= useState({
        uname: "",
        pwd: ""
    })
    const toBackend = async (ev)=>{
        ev.preventDefault()
        try {
            const response = await axios.post('https://library-mgmt-deploy.onrender.com/', formData);
            navigate(`library/`, {state: formData})
            console.log(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div className="form-container">
      <h1>User Login</h1>
      <form className="form" onSubmit={toBackend}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username"
            onChange={e=>modForm(p=>({...p, uname: e.target.value}))} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"
            onChange={e=>modForm(p=>({...p, pwd: e.target.value}))} />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default FormComponent;
