import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <main>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <ul className='menu-items'>
              <li onClick={() => navigate('/')}>
                <p>Home</p>
              </li>
              <li onClick={() => navigate('/todo-list')}>
                <p>Todos</p>
              </li>
              <li onClick={() => navigate('/about')}>
                <p>About</p>
              </li>
              <li onClick={() => navigate('/profile')}>
                <p>Profile</p>
              </li>
            </ul>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default Navbar;
