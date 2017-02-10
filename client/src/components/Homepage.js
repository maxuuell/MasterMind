import React from 'react';
import { Link } from 'react-router';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="container pt">

    <div className="row mt">
      <div className="col-lg-6 col-lg-offset-3 centered">
        <h3>Welcome to MasterMind!</h3>
        <h4>MasterMind is a collection of games designed to test and strengthen your mental fortitude. While everyone is allowed to play these games, creating an account gives
            you the ability to keep track of your personal progress</h4>
      </div>
    </div>
    <div className="row mt centered">
      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port01.jpg" alt="" /></a>
        <p>APE</p>
        <div>
        <Link to="/memorygame"> Memory</Link>
        </div>
        <div>
        <Link to="/scramblegame"> Scramble</Link>
        </div>
        <div>
        <Link to="/simon">Simon</Link>
        </div>

      </div>
      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port02.jpg" alt="" /></a>
        <p>RAIDERS</p>
      </div>
      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port03.jpg" alt="" /></a>
        <p>VIKINGS</p>
      </div>
    </div>


    <div className="row mt centered">

      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port04.jpg" alt="" /></a>
        <p>YODA</p>
      </div>

      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port05.jpg" alt="" /></a>
        <p>EMPERORS</p>
      </div>

      <div className="col-lg-4">
        <a className="zoom green" href="work01.html"><img className="img-responsive" src="assets/img/portfolio/port06.jpg" alt="" /></a>
        <p>CHIEFS</p>
      </div>
    </div>
  </div>
    );
  }
}