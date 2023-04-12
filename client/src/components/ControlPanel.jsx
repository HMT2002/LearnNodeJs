import './ControlPanel.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CheckTokenAction } from '../actions/userActions';

function ControllPanel(props) {
  const [userImage, setUserImage] = useState('');

  const [userAuthority, setUserAuthority] = useState('');

  const logOutHandler = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  const fetchAuth = useCallback(async () => {
    try {
      let tempAuthority = (
        <div className="p-sectionLinks">
          <ul className="p-sectionLinks-list">
            <li>
              <a href="/whats-new/posts/">New thead</a>
            </li>
            <li>
              <a href="/find-threads/started">Find threads</a>
            </li>
            <li>
              <a href="/sign/in">Sign in</a>
            </li>
            <li>
              <a href="/sign/up">Sign up</a>
            </li>
          </ul>
        </div>
      );

      if (props.currentUser) {
        switch (props.currentUser.role) {
          case 'user':
            tempAuthority = (
              <div className="p-sectionLinks">
                <ul className="p-sectionLinks-list">
                  <li>
                    <a href="/whats-new/thread/">New thead</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Find threads</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Your starred threads</a>
                  </li>

                  <li>
                    <a href="/find-threads/contributed">Threads with your posts</a>
                  </li>
                  <li>
                    <a href="/" onClick={logOutHandler}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            );
            break;

          case 'content-creator':
            tempAuthority = (
              <div className="p-sectionLinks">
                <ul className="p-sectionLinks-list">
                  <li>
                    <a href="/whats-new/posts/">New thead</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Find threads</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Your threads</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Your starred threads</a>
                  </li>
                  <li>
                    <a href="/find-threads/contributed">Threads with your posts</a>
                  </li>
                  <li>
                    <a href="/find-threads/unanswered">Unanswered threads</a>
                  </li>
                  <li>
                    <a href="/create-thread/">Create new thread</a>
                  </li>
                  <li>
                    <a href="/" onClick={logOutHandler}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            );
            break;

          case 'admin':
            tempAuthority = (
              <div className="p-sectionLinks">
                <ul className="p-sectionLinks-list">
                  <li>
                    <a href="/whats-new/posts/">New thead</a>
                  </li>
                  <li>
                    <a href="/find-threads/started">Find threads</a>
                  </li>
                  <li>
                    <a href="/create-thread/">Create new thread</a>
                  </li>
                  <li>
                    <a href="/admin">You are the admin</a>
                  </li>
                  <li>
                    <a href="/" onClick={logOutHandler}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            );

            break;
          case 'guest':
          default:
            break;
        }
        setUserImage(<img className="user-image" src={props.currentUser.photo.link} />);
      }

      setUserAuthority(tempAuthority);
    } catch (error) {
      // console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth, props.currentUser]);

  return (
    <React.Fragment>
      <div className="menu menu--structural" data-menu="menu" aria-hidden="true">
        <div className="user-info">{userImage}</div>
        <div className="menu-content">{userAuthority}</div>
      </div>
    </React.Fragment>
  );
}

export default ControllPanel;
