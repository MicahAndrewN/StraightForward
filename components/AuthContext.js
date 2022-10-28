import React from 'react'

const AuthContext = React.createContext({status:false, login:()=>{}, spotifyToken: ''});
 
export default AuthContext;