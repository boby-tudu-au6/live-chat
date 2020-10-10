import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { setSocket, logout, setChat, 
    setLoading, setOnlineChat,setProfile, setPhoto } from '../redux/action/action'
import { withRouter } from 'react-router-dom'

function Nav({
    profile,
    setProfile,
    setSocket,
    logout,
    chats,
    setChat,
    setLoading,
    history,
    setOnlineChat,
    setPhoto,
    ...props}) {
    const [socket,setConn] = useState(io.connect('https://chat4040.herokuapp.com'))
    // const [socket,setConn] = useState(io('/'))
    useEffect(()=>{
        setSocket(socket)
        if(profile!==undefined && profile!==null){
            socket.on('chat',data=>{
                setLoading(false)
                if(profile.recent===undefined){
                    const token = localStorage.getItem("token")
                    if(token===null){
                        history.push('/login')
                    }else{
                        socket.emit('checklogin',{token})
                        socket.emit('getphoto',{token})
                    }
                }
                socket.emit('getchat',{
                    data:(profile.phone).toString(),
                    data1:profile.recent
                })
            })

            
        }
    },[profile])

    
    socket.on("getphoto",data=>{
        setPhoto(data)
    })

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a href="/" className='navbar-brand'>Logo</a>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a 
                    onClick={e=>{
                        e.preventDefault()
                        logout()
                        history.push('/login')
                    }}
                    className="nav-link active" href="/">Logout</a>
                </li>
                </ul>
            </nav>
        </div>
    )
}

const mapDispatch = dispatch =>{
    return {
        setSocket:payload=>dispatch(setSocket(payload)),
        logout:()=>dispatch(logout()),
        setChat:payload=>dispatch(setChat(payload)),
        setLoading:payload=>dispatch(setLoading(payload)),
        setOnlineChat:payload=>dispatch(setOnlineChat(payload)),
        setProfile:payload=>dispatch(setProfile(payload)),
        setPhoto:payload=>dispatch(setPhoto(payload)),
        logout:()=>dispatch=>dispatch(logout())
    }
}
export default connect(state=>{return {...state}},mapDispatch)(withRouter(Nav))
