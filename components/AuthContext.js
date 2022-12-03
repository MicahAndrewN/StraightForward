import React from 'react'

const AuthContext = React.createContext({status:false, login:()=>{}, spotifyToken: '', logout: () => {}});
 
export default AuthContext;