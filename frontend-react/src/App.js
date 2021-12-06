import logo from './logo.svg';
import './App.css';

import PostList from "./components/post/PostList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

        <PostList />
    </div>
  );
}

export default App;
