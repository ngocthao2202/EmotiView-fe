import React from "react";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./header.module.css";
import logo from "./../../assets/logo.png";
import leftArrow from './../../assets/left-arrow.png'

const Header = () => {
  const currentUrl = window.location.pathname;
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header} style={{ background:'#F9F9F9', padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="logo" style={{ width: '15%', display:'flex', justifyContent:'center' }}>
        <img style={{ width: '40%' }} src={logo} alt="Logo"/>
      </div>
      {currentUrl === '/' ? 
      (
        <div style={{ width: '85%', display: 'flex', justifyContent: 'center' }} className={styles.circle}>
        <ul style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
              <li className={isActive("/") ? "active" : ""}>
                <a
                  onClick={() => {
                    setSelected('home');
                    navigate('/');
                  }}
                  className={`${styles.heading} ${selected === 'home' ? styles.active : ''}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSelected('about');
                    navigate('/aboutus');
                  }}
                  className={`${styles.heading} ${selected === 'about' ? styles.active : ''}`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setSelected('tips');
                  }}
                  className={`${styles.heading} ${selected === 'tips' ? styles.active : ''}`}
                >
                  Tips
                </a>
              </li>
              <li className={isActive("/predict") ? "active" : ""}>
                <a
                  onClick={() => {
                    navigate('/predict');
                    setSelected('predict');
                  }}
                  className={`${styles.heading} ${selected === 'predict' ? styles.active : ''}`}
                >
                  Predict
                </a>
              </li>
              <li>
                <a
                   onClick={() => {
                    setSelected('information');
                  }}
                  className={`${styles.heading} ${selected === 'contact' ? styles.active : ''}`}
                >
                  Information
                </a>
              </li>
        </ul>
      </div>
      ) : (
        <div style={{ width: '85%', display: 'flex', justifyContent: 'center' }} className={styles.circle}>
        <ul style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
          <li style={{display:"flex", gap:"12px", alignItems:'center'}} onClick={() => {
                navigate('/');
              }} className={isActive("/") ? "active" : ""}>
                <div style={{width:"2%", height: '2%', display:"flex", alignContent:"center"}}>
                  <img style={{width:"100%"}} src={leftArrow}/>
                </div>
            <a>Home</a>
          </li>
        </ul>
      </div>      
      )}
    </header>
  );
};

export default Header;
