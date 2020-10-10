import React, { useEffect, useState, useMemo } from 'react'
import {withRouter} from 'react-router-dom'
import Tabs from './tabs/Tabs'
import { connect } from 'react-redux'
import { setProfile, setChat, setOnlineChat, setLoading, setRecent } from '../redux/action/action'


function Home({
    history,
    socket,
    profile,
    setProfile,
    setChat,
    chats,
    setLoading,
    setOnlineChat,
    ...props
}) {
    const [phone,setPhone] = useState('')
    const [file,setFile] = useState(null)

    useEffect(()=>{
        if(socket!==null)checkLogin()
        // if(profile!==null)console.log(profile)
        
    },[socket])

    if(socket!==null){
        socket.on('getchat',data=>{
            if(data.chats.length!==0 && data.chats.length!==chats.length){
                setChat(data.chats)
            }
        })

        socket.on('checklogin',data=>{
            if(data.status==='ok'){
                if(data._doc.recent!==undefined)socket.emit('getchat',{
                    data:(data._doc.phone).toString(),
                    data1:data._doc.recent
                })
                setProfile(data._doc)
            }
        })
    }
    
    const checkLogin = () =>{
        const token = localStorage.getItem("token")
        if(token===null){
            history.push('/login')
        }else{
            socket.emit('checklogin',{token})
        }
        setLoading(false)
    }

    const sendMessage = (e) =>{
        e.preventDefault()
        setLoading(true)
        const {phone,chat} = e.target
        if(phone.value!==''){
            return socket.emit('chat',{
                from:profile.phone,
                to:phone.value,
                chat:{
                    type:file===null?"text":"img",
                    body:file===null?chat.value:{
                        type:file.type,
                        name:file.name,
                        file
                    }
                }
            })
        }else{
            setLoading(false)
            console.log('phone number is required')
        }
    }

    return (
        <div className='container'>
            
            {
                profile!==null && profile!==undefined ?
                <h2 className='text-center'>{profile.phone}</h2>
                :null
            }
            <p 
            style={{cursor:"pointer"}}
            className='text-dark text-center m-auto'>What is this number</p>

            <form 
            onSubmit={sendMessage}
            style={{backgroundColor:"#C8C8C8"}}
            className='col-10 col-md-8 p-3 p-md-3 m-auto'>
                <div className='row ml-auto mr-auto mb-3 p-0'>
                    <div className='col-3 text-right pt-1'><h6>TO</h6></div>
                    <div className='col-9'>
                        <input type="number"
                        name='phone'
                        className='form-control'/>
                    </div>
                </div>
                <div className='row m-auto p-0'>
                    <div className='col-3 text-right pt-1'><h6>Message</h6></div>
                    <div className='col-9'>
                        <textarea name='chat' className='form-control'></textarea>
                        <p className='text-primary' 
                        style={{cursor:"pointer"}} 
                        onClick={()=>document.querySelector('#file').click()}>
                            {
                                file===null?
                                'Attach photo':
                                file.name
                            }
                        </p>
                        <input className='d-none' type="file" 
                        name="img" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    </div>
                </div>
                <div className='text-right'>
                <button type='submit' className='btn btn-secondary btn-large btn-secondary'>
                    Send text message
                </button>
                </div>
            </form>
            <Tabs />
        </div>
        
    )
}

const mapState = state =>{return {...state}}
const mapDispatch = dispatch =>{
    return {
        setProfile:payload=>dispatch(setProfile(payload)),
        setChat:payload=>dispatch(setChat(payload)),
        setOnlineChat:payload=>dispatch(setOnlineChat(payload)),
        setLoading:payload=>dispatch(setLoading(payload)),
        setRecent:payload=>dispatch(setRecent(payload))
    }
}
export default connect(mapState,mapDispatch)(withRouter(Home))
