import { DO_LOGIN, SET_SOCKET, SET_PROFILE, SET_RECENT, SET_CHAT, SET_ONLINE_CHAT, SET_LOADING, SET_PHOTO, LOGOUT } from "../action/action";

const initState = {
    profile:null,
    socket : null,
    recent: null,
    chats: [],
    loading:false,
    photos:null
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case SET_SOCKET:return {...state,socket:payload}
        case SET_PROFILE:return {...state,profile:payload}
        case SET_RECENT:return {...state,recent:payload}
        case SET_CHAT:return {...state,chats:payload}
        case SET_ONLINE_CHAT:return {...state,chats:[...state.chats,payload]}
        case SET_LOADING:return {...state,loading:payload}
        case SET_RECENT:return {...state,recent:payload}
        case SET_PHOTO:{
            let arr = payload.filter(item=>item.body.type==='img')
            return {...state,photos:arr}
        }
        case LOGOUT:return {
            profile:null,
            socket : null,
            recent: null,
            chats: [],
            loading:false,
            photos:null}
        default : return state
    }
}

export default rootReducer