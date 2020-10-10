export const DO_LOGIN = 'DO_LOGIN'
export const SET_SOCKET = 'SET_SOCKET'
export const LOGOUT = 'LOGOUT'
export const SET_PROFILE = 'SET_PROFILE'
export const SET_RECENT = 'SET_RECENT'
export const SET_CHAT = 'SET_CHAT'
export const SET_ONLINE_CHAT = 'SET_ONLINE_CHAT'
export const SET_LOADING = 'SET_LOADING'
export const SET_PHOTO = 'SET_PHOTO'

export const doLogin = payload => async dispatch =>{
    console.log('hello')
}

export const setSocket = payload => dispatch =>{
    return dispatch({type:SET_SOCKET,payload})
}

export const logout = () => dispatch =>{
    localStorage.removeItem('token')
    return dispatch({type:LOGOUT})
}

export const setProfile = payload => dispatch =>{
    return dispatch({type:SET_PROFILE,payload})
}

export const setRecent = payload => dispatch =>{
    return dispatch({type:SET_RECENT,payload})
}

export const setChat = payload => dispatch =>{
    return dispatch({type:SET_CHAT,payload})
}

export const setOnlineChat = payload => dispatch =>{
    return dispatch({type:SET_ONLINE_CHAT,payload})
}

export const setLoading = payload => dispatch =>{
    return dispatch({type:SET_LOADING,payload})
}

export const setPhoto = payload => dispatch =>{
    return dispatch({type:SET_PHOTO,payload})
}

