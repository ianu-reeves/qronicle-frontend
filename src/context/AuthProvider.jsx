import React, {createContext} from "react";

const UserContext = createContext({});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState({});
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
