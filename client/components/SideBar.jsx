import React, { useState, useContext } from 'react';
import {
  Toggle,
  SideBarCont,
  HeaderCont,
  Header,
  Options,
  Feature
} from '../styles/SideBarStyles.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context.js';

const SideBar = ({ setPage }) => {
  const [isToggled, setToggle] = useState(false);
  const user = useContext(AuthContext);

  return (
    <>
      <Toggle
        onClick={() => setToggle(!isToggled)}
        className="far fa-user-circle"
        isToggled={isToggled}>
      </Toggle>
      <SideBarCont isToggled={isToggled}>
        <HeaderCont>
          <Header>{ user ? user.name : 'No user' }</Header>
        </HeaderCont>
        <Options>
          { user &&
            <Feature>
              <i class="fas fa-info-circle"></i>
              Info
            </Feature>
          }
          <Link to='/register'>
            <Feature id='register' onClick={(e) => setPage(e.target.id)}>
              <i class="fas fa-user-plus"></i>
              Sign Up
            </Feature>
          </Link>
          <Feature>
            {!user ? (
                <form action='/login'>
                  <i class="fas fa-sign-in-alt"></i>
                  <button type='submit'> Login </button>
                </form>
              ) : (
                <form method='post' action='/logout'>
                  <i class="fas fa-sign-in-alt"></i>
                  <button type='submit'> Logout </button>
                </form>
              )
            }
          </Feature>
          { user && (
            <Link to='/favorites'>
              <Feature id='favorites' onClick={(e) => setPage(e.target.id)}>
                <i class="fas fa-star"></i>
                Favorites
              </Feature>
            </Link>
          )}
        </Options>
      </SideBarCont>
    </>
  )
};

export default SideBar;