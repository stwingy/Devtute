import React from 'react'

export const LoginContext = React.createContext()
export function MoveLoginProvider({ children }) {


    const [move, setMove] = React.useState(false)

    return (
        <LoginContext.Provider value={{ move, setMove }}>
            {children}
        </LoginContext.Provider>
    )
}
export function useMover() {
    return React.useContext(LoginContext)
}
