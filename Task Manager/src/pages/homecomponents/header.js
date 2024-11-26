import React,{useState} from "react";
import { Link } from 'react-router-dom';
import './Home.css'

function Header(){

    const [isNightMode, setIsNightMode] = useState(false);
            
            const handleToggle = () => {
              setIsNightMode(!isNightMode);
              document.body.classList.toggle('night-mode', !isNightMode);
            };
            
return(
    <div id="header">  
    <div id="header-item">
    <h1 id="logo">Sports-Buddy</h1>
    </div>
    <div id="header-item">
      <label htmlFor="toggle-theme" id="toggle-theme-label">
        Light/Dark
      </label>
      <label className="switch">
        <input
          type="checkbox"
          id="toggle-theme"
          checked={isNightMode}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
    </div>
    <div class="header-item">
               
                
                <Link to="/" className="logout">LogOut</Link>
            </div>
    
             
    </div>
    )
};

export default Header;