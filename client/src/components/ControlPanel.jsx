import "./ControlPanel.css";

function ControllPanel(props) {
  return (
    <li>
      <div class="p-navEl is-selected" data-has-children="true">
        <div class="menu menu--structural" data-menu="menu" aria-hidden="true">
          <div class="menu-content">
            <a href="/whats-new/posts/">New posts</a>
            <a href="/find-threads/started">Find threads</a>
            <a href="/find-threads/started">Your threads</a>
            <a href="/find-threads/contributed">Threads with your posts</a>
            <a href="/find-threads/unanswered">Unanswered threads</a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ControllPanel;
