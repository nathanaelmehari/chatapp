
import { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Navbar from './components/Navbar.js';
import Cookies from 'universal-cookie';
import coy from './../src/img/coyyote.png'
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import {auth} from './firebase-config'
import mobile from './components/mobile';
const cookies = new Cookies()
const divStyle = {
  backgroundImage: 'url(' + coy + ')',
};
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const ink = window.innerWidth;
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  if (ink <= 1000){
    return mobile;
  }
  if (!isAuth){
    return (
      <div className="App">
        <Navbar />
        
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      {room ? (
        <Chat room={room} />
        
      ) : (
        <div className='n'>

          <div className='all' style={divStyle} >
            <label>Enter Name of Chat</label>
            <input ref={roomInputRef} />
            <button className='b1' onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        </div>
      )}
      <div onClick={signUserOut} className='sign-out'><button>signout</button></div>
    </div>
  )
}

export default App;
