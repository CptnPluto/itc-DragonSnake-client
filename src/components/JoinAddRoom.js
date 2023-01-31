import React from 'react'
import { AuthContext } from '../contexts/AuthContext'


const joinAddRoom = () => {

const {connectToSocket, joinRoom} = AuthContext


  return (
    <>
    <button onClick={joinRoom}>join room</button>
    <button onClick={connectToSocket}>open room</button>
    <form><input type="text" /></form>
    </>
  )
}

export default joinAddRoom