import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { doLogin } from '../redux/action/action'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

function Login({history,socket,...props}) {
    const [phone,setPhone] = useState('')

    useEffect(()=>{
        if(socket!==null)socket.on('login',data=>{
            if(data.status==='ok'){
                localStorage.setItem("token",data.token)
                return history.push('/')
            }
        })
    },[socket])

    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            socket.emit('login',{data:phone})
        }catch(err){
            console.log(err.message)
        }
    }
    return (
        <div>
            <form 
            onSubmit={handleLogin} 
            className='col-10 col-md-5 ml-auto mr-auto mt-5 p-3 rounded shadow justify-content-center'>
                <input type="number" 
                name="phone" value={phone}
                className='form-control col-12 border-secondary'
                placeholder='Enter phone number'
                onChange={e=>setPhone(e.target.value)}/>
                <button type='submit' 
                className='btn btn-sm mt-3 btn-secondary form-control'>Login</button>
            </form>
        </div>
    )
}

const mapState = state =>{return {...state}}
const mapDispatch = dispatch =>{
    return {
        doLogin:payload=>dispatch(doLogin(payload))
    }
}
export default connect(mapState,mapDispatch)(withRouter(Login))
