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
          <li>
            <a href="#" >Games▼</a>
          </li>
        </div>
        <div className="floatright">
          <li>
            <a href="#" >Login</a>
          </li>
          <li>
            <a href="#" >Signup</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

Window.NavBar = NavBar;
