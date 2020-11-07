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

const StreamRoom = ({ user }) => {
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

const useAgroaClient = ({ settings, setClientStatus, setRemoteUsers }) => {
  const join = async settings => {
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

      const localUser = { uid, audioTrack, videoTrack }
      localUser.videoTrack.play('local-user')
      await client.publish([audioTrack, videoTrack])
      toast.info('join channel success!')
      const status = { client, user: localUser }
      setClientStatus(status)
      return status
    } catch (e) {
      /* handle error */
      toast.error(e.message)
      return {}
    }
  }
  const leave = async (client, user) => {
    user.audioTrack.close()
    user.videoTrack.close()
    setClientStatus({})
    setRemoteUsers([])
    await client.leave()
  }

  const publish = async (client, tracks) => {
    return client.publish(tracks)
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

  return {
    join,
    leave,
    publish,
    unpublish,
    mute,
    unmute
  }
}

const App = () => {
  const [remoteUsers, setRemoteUsers] = useState([])
  const [clientStatus, setClientStatus] = useState({})
  const [settings, setSettings] = useState({
    appID: 'b09b71cce3ea499a80e7e94c9abae12e',
    channel: 'runTheWorld',
    token:
      '006ed1ec7534a41423faea1f5a3ccd04399IACT3bNUZDYGuocHIMczy6J7jZR8eqQbw8tbIwQGs2qA/DnmkEUAAAAAEABJgS3VcxeoXwEAAQByF6hf'
  })

  const { client, user: localUser } = clientStatus
  const { join, leave, publish, unpublish, mute, unmute } = useAgroaClient({
    settings,
    setClientStatus,
    setRemoteUsers
  })

  return (
    <div className="App">
      <ToastContainer position="bottom-left" />
      <ClientSettings setSettings={setSettings} />
      {!client ? (
        <button onClick={() => join(settings)}>Join</button>
      ) : (
        <>
          <button onClick={() => leave(client, localUser)}>Leave</button>
          <button onClick={() => unpublish(client, localUser)}>
            Unpublish
          </button>
          <button onClick={() => publish(client, localUser)}>Publish</button>
          <button onClick={() => mute(client, localUser)}>Mute</button>
          <button onClick={() => unmute(client, localUser)}>Unmute</button>
        </>
      )}
      <StreamRooms>
        <LocalStream id="local-user" />
        {remoteUsers?.map(user => (
          <StreamRoom key={user.uid} user={user} />
        ))}
      </StreamRooms>
    </div>
  )
}

export default App
