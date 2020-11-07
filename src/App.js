import React, { useState, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import styled from 'styled-components'

import './App.css'

const LocalStream = styled.div`
  width: 180px;
  height: 120px;
`

// Options for joining a channel
// const options = {
//   appID: 'b09b71cce3ea499a80e7e94c9abae12e',
//   channel: 'runTheWorld',
//   uid: null,
//   token:
//     '006ed1ec7534a41423faea1f5a3ccd04399IABZqWtmG/8C0MsRljAYu57oVqrjsyK657NiC4UzlwzI+znmkEUAAAAAEABJgS3VXbqnXwEAAQBcuqdf'
// }

const join = async (settings, setRemoteUsers) => {
  const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'h264'
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
    console.log('unpublish!!!!!!!!!!!!!')
    console.log(mediaType)
    console.log('vidoe: ', user.hasVideo)
    console.log('audio: ', user.hasAudio)
    setRemoteUsers(currUsers => currUsers.filter(I => I.uid !== user.uid))
  })

  const { appId, channel, token } = settings
  const uid = await client.join(appId, channel, token)
  const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  const videoTrack = await AgoraRTC.createCameraVideoTrack()
  const user = { uid, audioTrack, videoTrack }

  await client.publish([audioTrack, videoTrack])
  return { client, user }
}

const StreamRoom = ({ user }) => {
  useEffect(() => {
    console.log(user)
    try {
      user.audioTrack?.play()
      user.videoTrack?.play(user.uid.toString())
    } catch (e) {
      /* handle error */
      console.log(e)
    }
  }, [])
  const { uid } = user
  return (
    <div>
      <p>uid: {uid}</p>
      <LocalStream id={uid} />
    </div>
  )
}

const ClientSettings = ({ setSettings }) => {
  const handleChange = name => event =>
    setSettings(settings => ({ ...settings, [name]: event.target.value }))

  return (
    <div>
      <input type="text" name="appId" onChange={handleChange('appId')} />
      <input type="text" name="channel" onChange={handleChange('channel')} />
      <input type="text" name="token" onChange={handleChange('token')} />
    </div>
  )
}

const App = () => {
  const [remoteUsers, setRemoteUsers] = useState([])
  const [clientStatus, setClientStatus] = useState({})
  const [settings, setSettings] = useState({})

  const { client, user: localUser } = clientStatus

  const leave = async (client, user) => {
    user.audioTrack.close()
    user.videoTrack.close()
    setClientStatus(I => ({ ...I, user: null }))
    setRemoteUsers([])
    await client.leave()
  }

  const publish = async (client, user) => {
    return client.publish([user.audioTrack, user.videoTrack])
  }

  const unpublish = async (client, user) => {
    return client.unpublish([user.audioTrack, user.videoTrack])
  }

  const mute = async (client, user) => {
    return client.unpublish([user.audioTrack])
  }

  const unmute = async (client, user) => {
    return client.publish([user.audioTrack])
  }

  console.log('aaaaaaaaaaaaa')
  console.log(remoteUsers)
  console.log(settings)

  return (
    <div className="App">
      <ClientSettings setSettings={setSettings} />
      <button
        onClick={async () => {
          const status = await join(settings, setRemoteUsers)
          setClientStatus(status)
        }}>
        Join
      </button>
      <button onClick={() => leave(client, localUser)}>Leave</button>
      {client && (
        <>
          <button onClick={() => unpublish(client, localUser)}>
            Unpublish
          </button>
          <button onClick={() => publish(client, localUser)}>Publish</button>
          <button onClick={() => mute(client, localUser)}>Mute</button>
          <button onClick={() => unmute(client, localUser)}>Unmute</button>
        </>
      )}
      {localUser && <StreamRoom user={localUser} />}
      {remoteUsers?.map(user => (
        <StreamRoom key={user.uid} user={user} />
      ))}
    </div>
  )
}

export default App
