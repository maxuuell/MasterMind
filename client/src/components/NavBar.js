import React from 'react';
import {Link} from 'react-router';



export const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <div className="floatleft">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#" >Leaderboard</a>
          </li>
          <li>
            <a href="#" >Profile</a>
          </li>
          <li className="dropthis">
            <a href="#" >Games▼</a>
              <ul className="dropdown">
                <li><Link className="test" to="/memory">Memory</Link>
                </li>
                <li><a className="test" href="#">Scramble</a>
                </li>
              </ul>
          </li>
          <div className="floatright">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
        </div>
        </div>
      </ul>
    </nav>
  );
};
