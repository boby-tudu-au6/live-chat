import React, { useEffect } from 'react'
import Section1 from './Section1'
import { connect } from 'react-redux'

function Tabs({photos,socket}) {
    let token = localStorage.getItem("token")
    useEffect(()=>{
        if(socket!==null)socket.emit('getphoto',{token})
    },[socket])
    return (
        <div className="container mt-3">
            <br/>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                <a className="nav-link active text-secondary" 
                data-toggle="tab" 
                href="#home">Recent conversation</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-secondary" 
                data-toggle="tab"
                href="#menu1">All conversations</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-secondary" 
                data-toggle="tab" 
                href="#menu2">Photos</a>
                </li>
            </ul>
            <div className="tab-content" style={{height:"50vh"}}>
                <Section1 />
                <div id="menu1" 
                className="container tab-pane fade pt-3">
                <h3>all conversation page</h3>
                <p>
                    details about this page is empty that's why this section is empty
                </p>
                </div>
                <div id="menu2" 
                className="container tab-pane fade pt-3">
                    <h3 className='text-center'>this section is not real time reload is required to view latest data</h3>
                <div className='col-12 row m-auto p-0'>
                    {
                        photos!==null?
                        photos.map(item=>(
                            <div key={item._id} className='col-3 p-3'>
                                <img src={item.body.body} className='col-12 p-0' alt=""/>
                            </div>
                        )):null
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default connect(state=>{return {...state}})(Tabs)
