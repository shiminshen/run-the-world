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
    '006ed1ec7534a41423faea1f5a3ccd04399IABZqWtmG/8C0MsRljAYu57oVqrjsyK657NiC4UzlwzI+znmkEUAAAAAEABJgS3VXbqnXwEAAQBcuqdf'
}

const join = async () => {
  const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'h264'
  })
  const uid = await client.join(options.appId, options.channel, options.token)
  const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  const videoTrack = await AgoraRTC.createCameraVideoTrack()
  const user = { uid, audioTrack, videoTrack }

  await client.publish([audioTrack, videoTrack])
  return { client, user }
}

const useRoomUsers = client => {
  const [remoteUsers, setRemoteUsers] = useState([])

  useEffect(() => {
    if (!client) {
      return
    }

    client.on('user-added', async (user, mediaType) => {
      console.log('user-subscribed: ', user)
      // Initiate the subscription
      await client.subscribe(user, mediaType)
      setRemoteUsers(currUsers => {
        // only add non exist users
        if (!currUsers.find(I => I.uid === user.uid)) {
          return [...currUsers, user]
        } else {
          return currUsers
        }
      })
    })

    // remote publish
    client.on('user-published', async (user, mediaType) => {
      console.log('user-published: ', user)
      console.log(user)
      // Initiate the subscription
      await client.subscribe(user, mediaType)
      setRemoteUsers(currUsers => {
        // only add non exist users
        if (!currUsers.find(I => I.uid === user.uid)) {
          return [...currUsers, user]
        } else {
          return currUsers
        }
      })
    })

    // remote user unpublished
    client.on('user-unpublished', async (user, mediaType) => {
      console.log('user-unpublished: ', user)
      // Initiate the subscription
      setRemoteUsers(currUsers => currUsers.filter(I => I.uid !== user.uid))
    })
  }, [client])

  return { localUser: client, remoteUsers }
}

const StreamRoom = ({ user }) => {
  useEffect(() => {
    // track not exist in users of client in first joined
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
  const [clientStatus, setClientStatus] = useState({})
  const { client, user: localUser } = clientStatus
  const { remoteUsers } = useRoomUsers(client)

  const leave = async (client, user) => {
    user.audioTrack.close()
    user.videoTrack.close()
    setClientStatus(originStatus => ({ ...originStatus, user: null }))
    await client.leave()
  }

  return (
    <div className="App">
      <button
        onClick={async () => {
          const status = await join()
          setClientStatus(status)
        }}>
        Join
      </button>
      <button onClick={() => leave(client, localUser)}>Leave</button>
      {localUser && <StreamRoom user={localUser} />}
      {remoteUsers?.map(user => (
        <StreamRoom key={user.uid} user={user} />
      ))}
    </div>
  )
}

export default App
