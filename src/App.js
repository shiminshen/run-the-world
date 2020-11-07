import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import AgoraRTC from 'agora-rtc-sdk-ng'
import styled from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const LocalStream = styled.div`
  width: 180px;
  height: 120px;
`

const SettingForm = styled.div`
  label {
    display: block;
  }
`

const StreamRooms = styled.div`
  display: flex;
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

  try {
    const { appId, channel, token } = settings
    const uid = await client.join(appId, channel, token)
    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
    const videoTrack = await AgoraRTC.createCameraVideoTrack()

    const user = { uid, audioTrack, videoTrack }
    await client.publish([audioTrack, videoTrack])
    toast.info('join channel success!')
    return { client, user }
  } catch (e) {
    /* handle error */
    toast.error(e.message)
    return {}
  }
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
    <SettingForm>
      <div>
        <label htmlFor="appId">appId</label>
        <input
          id="appId"
          type="text"
          name="appId"
          onChange={handleChange('appId')}
        />
      </div>
      <div>
        <label htmlFor="channel">Channel</label>
        <input
          id="channel"
          type="text"
          name="channel"
          onChange={handleChange('channel')}
        />
      </div>
      <div>
        <label htmlFor="token">Token</label>
        <input
          id="token"
          type="text"
          name="token"
          onChange={handleChange('token')}
        />
      </div>
    </SettingForm>
  )
}

const App = () => {
  const [remoteUsers, setRemoteUsers] = useState([])
  const [clientStatus, setClientStatus] = useState({})
  const [settings, setSettings] = useState({
    appID: 'b09b71cce3ea499a80e7e94c9abae12e',
    channel: 'runTheWorld',
    token:
      '006ed1ec7534a41423faea1f5a3ccd04399IABZqWtmG/8C0MsRljAYu57oVqrjsyK657NiC4UzlwzI+znmkEUAAAAAEABJgS3VXbqnXwEAAQBcuqdf'
  })

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

  console.log(localUser)

  return (
    <div className="App">
      <ToastContainer />
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
      <StreamRooms>
        {localUser && <StreamRoom user={localUser} />}
        {remoteUsers?.map(user => (
          <StreamRoom key={user.uid} user={user} />
        ))}
      </StreamRooms>
    </div>
  )
}

export default App
