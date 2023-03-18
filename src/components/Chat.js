import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth,db } from '../firebase-config'

const Chat = (props) => {
  const {room} = props;
  const [newMessages, setNewMessages] = useState("")
  const[messages, setmessages] = useState([])
  const messageRef = collection(db, 'messages')
  const mesgendref = useRef(null);
  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==",room), orderBy('createdAt'));
    const unsubscribe = onSnapshot(queryMessages, (snapshoot) => {
      let mesg = [];
      snapshoot.forEach((doc) => {
        mesg.push({...doc.data(), id: doc.id })
      });
      setmessages(mesg)
    });
    return () => unsubscribe();
  }, [])
  useEffect(() => {
    mesgendref.current?.scrollIntoView();
  }, [messages])
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (newMessages === '') return;
    await addDoc(messageRef, {
        text: newMessages,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room, 
    });
    setNewMessages("");
  };
  return (
    <div className='chat1'>
      <div className='inbox'><h1>Inbox</h1></div>
      <div className='header'><h1>Welcome to Jumangi just kidding to : {room.toUpperCase()}</h1></div>
      <div className='hj'>{messages.map((message) => <div className='comp' key={message.id}><div className='dv'>{message.user}</div>  <p className='p'>{message.text}</p></div>)} <div ref={mesgendref}></div> </div>

      <form onSubmit={handleSubmit} className='new-message-form'>
        <input value={newMessages} onChange={(e) => setNewMessages(e.target.value)} className='in' placeholder='Dont be shy type something' />
        <button type='submit' className='send-button' >Send</button>
      </form>
    </div>
  )
}

export default Chat
