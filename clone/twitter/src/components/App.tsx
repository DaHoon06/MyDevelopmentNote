import React, {useState} from 'react';
import AppRouter from "components/Router";
import { authService } from '../config/firebase.config';

function App() {

  const [isLoggedIn, setIsLoggedIn]  = useState(false);
  return (
      <>
        <AppRouter
            isLoggedIn={isLoggedIn}
        />
        <footer>&copy; {new Date().getFullYear()} Twitter DH</footer>
      </>

  );
}

export default App;
