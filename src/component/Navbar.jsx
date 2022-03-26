import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <main>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <ul className='menu-items'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/todo-list'>List of Todos</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/sign-up'>Sign Up</Link>
              </li>
            </ul>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default Navbar;
