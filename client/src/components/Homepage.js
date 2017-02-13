import React from 'react';
import { Link } from 'react-router';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container pt">

          <div className="row">

            <h1>Welcome to MegaMind!</h1>
            <br/>
            <p>MegaMind is a collection of games designed to test and strengthen your mental fortitude. While everyone is allowed to play these games, creating an account gives
              you the ability to keep track of your personal progress.</p>
            <br/>
          </div>
        </div>
        <div className= "container" className="center-block">
          <div className = "row">

            <div className = "col-sm-6 col-md-3">
              <Link to="/nback">
                <figure>
                  <img src={'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/128/arrow-back-icon.png'} alt="arrow" className="img-rounded"/>
                  <figcaption>N Back</figcaption>
      </figure>
    </Link>
  </div>

  <div className = "col-sm-6 col-md-3">
    <Link to="/memorygame">
      <figure>
      <img src={'http://icons.iconarchive.com/icons/graphicloads/medical-health/128/human-brain-icon.png'} alt="brain" className="img-rounded"/>
      <figcaption>Memory</figcaption>
      </figure>
    </Link>
  </div>

  <div className = "col-sm-6 col-md-3">
    <Link to="/scramblegame">
      <figure>
        <img src={'http://icons.iconarchive.com/icons/martz90/circle/128/books-icon.png'} alt="book" className="img-rounded"/>
        <figcaption>Word Scramble</figcaption>
      </figure>
    </Link>
  </div>

  <div className = "col-sm-6 col-md-3">
    <Link to="/simon">
      <figure>
      <img src={'http://icons.iconarchive.com/icons/graphicloads/flat-finance/128/ideas-icon.png'} alt="bulb" className="img-rounded"/>
      <figcaption>Simon</figcaption>
      </figure>
    </Link>
  </div>
      </div>
    </div>
  </div>
    );
  }
}
