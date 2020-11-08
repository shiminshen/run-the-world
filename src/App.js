import React, { useState, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import AgoraRTC from 'agora-rtc-sdk-ng'
import styled from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

const Buttons = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 6px;
  }
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
  const join = useCallback(async () => {
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
      toast.error(e?.message)
      return {}
    }
  }, [setClient, setLocalUser, setRemoteUsers, settings])

  const leave = useCallback(async () => {
    try {
      localUser.audioTrack.close()
      localUser.videoTrack.close()
      setClient(null)
      setLocalUser(null)
      setRemoteUsers([])
      await client.leave()
    } catch (e) {
      /* handle error */
      toast.error(e?.message)
    }
  }, [localUser, setClient, setLocalUser, setRemoteUsers, client])

  const show = useCallback(async () => {
    try {
      await localUser.videoTrack.setEnabled(true)
      return client.publish([localUser.videoTrack])
    } catch (e) {
      /* handle error */
      toast.error(e?.message)
    }
  }, [localUser, client])

  const hide = useCallback(async () => {
    try {
      await localUser.videoTrack.setEnabled(false)
      return client.unpublish([localUser.videoTrack])
    } catch (e) {
      toast.error(e?.message)
    }
  }, [localUser, client])

  const mute = useCallback(async () => {
    try {
      return client.unpublish([localUser.audioTrack])
    } catch (e) {
      /* handle error */
      toast.error(e?.message)
    }
  }, [localUser, client])

  const unmute = useCallback(async () => {
    try {
      return client.publish([localUser.audioTrack])
    } catch (e) {
      /* handle error */
      toast.error(e?.message)
    }
  }, [localUser, client])

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
    appID: '',
    channel: '',
    token: ''
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
    <Wrapper>
      <ToastContainer position="bottom-left" />
      <h1>Run The World</h1>
      <ClientSettings setSettings={setSettings} />
      <Buttons>
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
      </Buttons>
      <StreamRooms>
        <StreamRoom id="local-user" user={localUser} />
        {remoteUsers?.map(user => (
          <StreamRoom key={user.uid} user={user} />
        ))}
      </StreamRooms>
    </Wrapper>
  )
}

export default App
