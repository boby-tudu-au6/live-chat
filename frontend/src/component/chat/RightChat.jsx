import React from 'react'
import './style.css'

function RightChat({text,time,from,type}) {
    return (
        <div className='right'>
            <p className='text-secondary p-0 m-0 d-block'><strong className='text-dark'>{from} </strong> {new Date(time).toDateString()}</p>
            <div className='p-2 rounded' style={{backgroundColor:"#C8C8C8"}}>
                {
                    type==='text'?
                    <p className='p-0 m-0'>{text.body}</p>:
                    <img className='col-12 p-0' src={text.body} alt="img"/>
                }
            </div>
        </div>
    )
}

export default RightChat