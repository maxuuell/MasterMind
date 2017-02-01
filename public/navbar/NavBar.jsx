var NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <div className="floatleft">
          <li>
            <a href="#" >Home</a>
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
                <li><a className="test" href="#">Memory</a>
                </li>
                <li><a className="test" href="#">Scramble</a>
                </li>
              </ul>
          </li>
          <div className="floatright">
            <li>
              <a href="#" >Signup</a>
            </li>
            <li>
              <a href="#" >Login</a>
            </li>
        </div>
        </div>
      </ul>
    </nav>
  );
};

Window.NavBar = NavBar;
