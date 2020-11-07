import React, { useState } from 'react'
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

const StreamRoom = ({ id, user }) => {
  const uid = id || user.uid
  return (
    <div>
      {user && <p>uid: {uid}</p>}
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

const useAgroaClient = ({
  client,
  localUser,
  settings,
  setLocalUser,
  setClient,
  setRemoteUsers
}) => {
  const join = async () => {
    const client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'h264'
    })

    // remote publish
    client.on('user-joined', async user => {
      // Initiate the subscription
      // await client.subscribe(user, mediaType)
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
      toast.info(`user-published: ${user.uid} ${mediaType}`)
      // Initiate the subscription
      await client.subscribe(user, mediaType)
      // setRemoteUsers(currUsers => [...currUsers])
      if (mediaType === 'video') {
        user.videoTrack.play(user.uid.toString())
      } else if (mediaType === 'audio') {
        user.audioTrack.play()
      }
    })

    // remote user unpublished
    client.on('user-unpublished', async (user, mediaType) => {
      toast.warning(`user-unpublished: ${user.uid} ${mediaType}`)
    })

    // remote user unpublished
    client.on('user-left', async (user, mediaType) => {
      setRemoteUsers(currUsers => currUsers.filter(I => I.uid !== user.uid))
    })

    try {
      const { appId, channel, token } = settings
      const uid = await client.join(appId, channel, token)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      const videoTrack = await AgoraRTC.createCameraVideoTrack()

      videoTrack.play('local-user')
      setLocalUser({ uid, audioTrack, videoTrack })

      await client.publish([audioTrack, videoTrack])
      toast.info('join channel success!')
      setClient(client)
      return client
    } catch (e) {
      /* handle error */
      toast.error(e.message)
      return {}
    }
  }

  const leave = async () => {
    localUser.audioTrack.close()
    localUser.videoTrack.close()
    setClient(null)
    setRemoteUsers([])
    await client.leave()
  }

  const show = async () => {
    return client.publish([localUser.videoTrack])
  }

  const hide = async () => {
    return client.unpublish([localUser.videoTrack])
  }

  const mute = async () => {
    return client.unpublish([localUser.audioTrack])
  }

  const unmute = async () => {
    return client.publish([localUser.audioTrack])
  }

  return {
    join,
    leave,
    show,
    hide,
    mute,
    unmute
  }
}

const App = () => {
  const [localUser, setLocalUser] = useState()
  const [remoteUsers, setRemoteUsers] = useState([])
  const [client, setClient] = useState()
  const [settings, setSettings] = useState({
    appID: 'b09b71cce3ea499a80e7e94c9abae12e',
    channel: 'runTheWorld',
    token:
      '006ed1ec7534a41423faea1f5a3ccd04399IACT3bNUZDYGuocHIMczy6J7jZR8eqQbw8tbIwQGs2qA/DnmkEUAAAAAEABJgS3VcxeoXwEAAQByF6hf'
  })

  const { join, leave, show, hide, mute, unmute } = useAgroaClient({
    client,
    localUser,
    settings,
    setLocalUser,
    setClient,
    setRemoteUsers
  })

  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <h1>Run The World</h1>
      <ClientSettings setSettings={setSettings} />
      {!client ? (
        <button onClick={join}>Join</button>
      ) : (
        <>
          <button onClick={leave}>Leave</button>
          <button onClick={show}>Show</button>
          <button onClick={hide}>Hide</button>
          <button onClick={mute}>Mute</button>
          <button onClick={unmute}>Unmute</button>
        </>
      )}
      <StreamRooms>
        <StreamRoom id="local-user" user={localUser} />
        {remoteUsers?.map(user => (
          <StreamRoom key={user.uid} user={user} />
        ))}
      </StreamRooms>
    </div>
  )
}

export default App
