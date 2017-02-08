import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Dropdown, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Navigation = ({ auth, profile }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/'>
            <a>MegaMind</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to='/profile'>
            <NavItem eventKey={1} href="#">Profile</NavItem>
          </LinkContainer>
          <LinkContainer to='/leaderboard'>
            <NavItem eventKey={1} href="#">Leaderboard</NavItem>
          </LinkContainer>
          <NavDropdown eventKey={3} title="Games" id="basic-nav-dropdown">
            <LinkContainer to='/scramblegame'>
              <MenuItem eventKey={3.1}>Scramble</MenuItem>
            </LinkContainer>
            <LinkContainer to='/nback'>
              <MenuItem eventKey={3.2}>N-Back</MenuItem>
            </LinkContainer>
            <LinkContainer to='/phaser'>
              <MenuItem eventKey={3.1}>Jimmy's Epic Phaser Game</MenuItem>
            </LinkContainer>
            <LinkContainer to='/renata'>
              <MenuItem eventKey={3.1}>Renata's Sweet Game</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem style={profile ? {display: 'none'} : {display: ''}} onClick={auth.login.bind(this)} eventKey={1}>Login</NavItem>
          <div style={profile ? {display: ''} : {display: 'none'}}>
            <Dropdown>
              <Dropdown.Toggle>
                <Glyphicon glyph="user" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <LinkContainer to='/profile'>
                  <MenuItem eventKey={4.1}>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to='/leaderboard'>
                  <MenuItem eventKey={4.2}>LeaderBoard</MenuItem>
                </LinkContainer>
                <MenuItem onClick={auth.logout()}>Logout</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
