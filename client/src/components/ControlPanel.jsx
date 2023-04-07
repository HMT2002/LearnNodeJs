import './ControlPanel.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function ControllPanel() {
  const [userStatus, setUserStatus] = useState('');

  //let userAuthority;
  const [userAuthority, setUserAuthority] = useState('');

  // switch (userStatus) {
  //   case 'Normie':
  //     userAuthority = (
  //       <div className="p-sectionLinks">
  //         <ul className="p-sectionLinks-list">
  //           <li>
  //             <a href="/whats-new/thread/">New thead</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Find threads</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Your starred threads</a>
  //           </li>

  //           <li>
  //             <a href="/find-threads/contributed">Threads with your posts</a>
  //           </li>
  //           <li>
  //             <a href="/sign/out">Sign out</a>
  //           </li>
  //         </ul>
  //       </div>
  //     );
  //     break;
  //   case 'ContentCreator':
  //     userAuthority = (
  //       <div className="p-sectionLinks">
  //         <ul className="p-sectionLinks-list">
  //           <li>
  //             <a href="/whats-new/posts/">New thead</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Find threads</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Your threads</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Your starred threads</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/contributed">Threads with your posts</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/unanswered">Unanswered threads</a>
  //           </li>
  //           <li>
  //             <a href="/create-thread/">Create new thread</a>
  //           </li>
  //           <li>
  //             <a href="/sign/out">Sign out</a>
  //           </li>
  //         </ul>
  //       </div>
  //     );

  //     break;
  //   case 'Guest':
  //   default:
  //     userAuthority = (
  //       <div className="p-sectionLinks">
  //         <ul className="p-sectionLinks-list">
  //           <li>
  //             <a href="/whats-new/posts/">New thead</a>
  //           </li>
  //           <li>
  //             <a href="/find-threads/started">Find threads</a>
  //           </li>
  //           <li>
  //             <a href="/sign/in">Sign in</a>
  //           </li>
  //           <li>
  //             <a href="/sign/up">Sign up</a>
  //           </li>
  //         </ul>
  //       </div>
  //     );

  //     break;
  // }
  const storedToken = localStorage.getItem('token');

  console.log('localstorage: ControlPanel');
  console.log(localStorage.getItem('token'));

  const logOutHandler = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  const fetchAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/auth/check-token', {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: storedToken,
        },
      });
      if (!response.status) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      let tempAuthority;

      if (data.status === 'ok') {
        switch (data.role) {
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
                    <a href="/sign/in">Sign in</a>
                  </li>
                  <li>
                    <a href="/sign/up">Sign up</a>
                  </li>
                </ul>
              </div>
            );
            break;
        }
      } else {
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
                <a href="/sign/in">Sign in</a>
              </li>
              <li>
                <a href="/sign/up">Sign up</a>
              </li>
            </ul>
          </div>
        );
      }
      setUserAuthority(tempAuthority);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  return (
    <React.Fragment>
      <div className="menu menu--structural" data-menu="menu" aria-hidden="true">
        <div className="menu-content">{userAuthority}</div>
      </div>
    </React.Fragment>
  );
}

export default ControllPanel;
