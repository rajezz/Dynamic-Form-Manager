import React, { createContext } from "react"

/**
 * Create a React context to serve the User object.
 */
export const UserContext = createContext("")

export const UserProvider = ({email, children}:any) => {
	return <UserContext.Provider value={email}>{children}</UserContext.Provider>
}
