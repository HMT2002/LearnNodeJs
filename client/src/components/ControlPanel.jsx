import './ControlPanel.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function ControllPanel(props) {
  const [userStatus, setUserStatus] = useState(props.userStatus);

  let userAuthority;

  switch (userStatus) {
    case 'Normie':
      userAuthority = (
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
              <a href="/sign/out">Sign out</a>
            </li>
          </ul>
        </div>
      );
      break;
    case 'ContentCreator':
      userAuthority = (
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
              <a href="/sign/out">Sign out</a>
            </li>
          </ul>
        </div>
      );

      break;
    case 'Guest':
    default:
      userAuthority = (
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

  return (
    <div className="p-navEl is-selected" data-has-children="true">
      <div className="menu menu--structural" data-menu="menu" aria-hidden="true">
        <div className="menu-content">{userAuthority}</div>
      </div>
    </div>
  );
}

export default ControllPanel;
