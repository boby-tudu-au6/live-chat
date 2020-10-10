import React from 'react'
import LeftChat from '../chat/LeftChat'
import './style.css'
import RightChat from '../chat/RightChat'
import { connect } from 'react-redux'

function Section1({chats,profile,recent}) {
    // if(chats.length!==0)console.log(chats)
    return (
        <div id="home" style={{paddingBottom:"300px"}}
        className="container tab-pane active pt-3">
            {
                profile!==null && profile.recent!==undefined?
                <><div className='row m-auto col-12 p-3'>
                <div className='col text-left'>
                    <h4 className='d-inline'>7004212602</h4>
                    <p className='text-secondary d-inline'> Set a name for this number</p>
                </div>
                <div className='col text-right'>
                    <p style={{cursor:"pointer"}}>View all conversations</p>
                </div>
            </div>
            <div className='p-0 row m-auto col-12'>
                <input type="text" 
                className='form-control col-10 pb-0' 
                placeholder='Enter message' />
                <div className='col-2 pl-2 pr-2 pb-0'>
                    <button className='btn btn-secondary'>Send</button>
                </div>
            </div>
            <p className='pl-3 m-0 pt-0 pb-0' style={{cursor:"pointer"}}>
                Attach image
            </p>
            <div className='text-center mt-5 p-2 bg-secondary rounded'>
                <p className='pt-2 text-light'>
                    You have 1 message scheduled for later delivery. 
                    <strong>Click here to view them</strong>
                </p>
            </div>
            <div className='scrollview mt-3 pt-3 pb-3 pl-2 pr-2'>
                {
                    chats.length!==0?
                    chats.map(item=>(
                        <div key={item._id}>
                            {
                                parseInt(parseInt(item.from))===profile.phone?
                                <LeftChat text={item.body} 
                                type={item.body.type} 
                                from={item.from}
                                time={new Date(item.time).toDateString()}/>:
                                <RightChat text={item.body} 
                                type={item.body.type} 
                                from={item.from}
                                time={new Date(item.time).toDateString()}/>
                            }
                        </div>
                    )):null
                }
            </div></>:null
            }
        </div>
    )
}

export default connect(state=>{return {...state}})(Section1)
