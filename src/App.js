import React, { useState, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import styled from 'styled-components'

import './App.css'

const LocalStream = styled.div`
  width: 180px;
  height: 120px;
`

// Options for joining a channel
const options = {
  appID: 'b09b71cce3ea499a80e7e94c9abae12e',
  channel: 'runTheWorld',
  uid: null,
  token:
    '006ed1ec7534a41423faea1f5a3ccd04399IADFU4iZhLhhspYUXTBBpWMSozl7td51ttBXN4VJQU5AFznmkEUAAAAAEABqf2Zw4ZKnXwEAAQDgkqdf'
}

async function startCall(client) {
  const uid = await client.join(options.appId, options.channel, options.token)
  const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  const videoTrack = await AgoraRTC.createCameraVideoTrack()

  await client.publish([audioTrack, videoTrack])
  return { uid, audioTrack, videoTrack }
}

const StreamRoom = ({ user }) => {
  useEffect(() => {
    user.audioTrack.play()
    user.videoTrack.play(user.uid.toString())
  }, [])
  const { uid } = user
  return (
    <div>
      <p>uid: {uid}</p>
      <LocalStream id={uid} />
    </div>
  )
}

const App = () => {
  const [, setClient] = useState()
  const [roomUsers, setRoomUsers] = useState([])
  useEffect(async () => {
    const client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'h264'
    })

    client.on('user-published', async (user, mediaType) => {
      // Initiate the subscription
      await client.subscribe(user, mediaType)
      setRoomUsers(currUsers => [...currUsers, user])
    })

    const localUser = await startCall(client)
    setClient(client)
    setRoomUsers([localUser])
  }, [])

  console.log('!!!!!!!!!!!!')
  console.log(roomUsers)

  return (
    <div className="App">
      {roomUsers.map(user => (
        <StreamRoom key={user.uid} user={user} />
      ))}
    </div>
  )
}

export default App
