import './ControlPanel.css';

function ControllPanel(props) {
  return (
    <div class="p-navEl is-selected" data-has-children="true">
      <div class="menu menu--structural" data-menu="menu" aria-hidden="true">
        <div class="menu-content">
          <ul className="p-sectionLinks-list">
            <li>
              <a href="/whats-new/posts/">New posts</a>
            </li>
            <li>
              <a href="/find-threads/started">Find threads</a>
            </li>
            <li>
              <a href="/find-threads/started">Your threads</a>
            </li>

            <li>
              <a href="/find-threads/contributed">Threads with your posts</a>
            </li>
            <li>
              <a href="/find-threads/unanswered">Unanswered threads</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ControllPanel;
