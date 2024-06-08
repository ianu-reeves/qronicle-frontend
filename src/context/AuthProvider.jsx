import React, {createContext} from "react";

const UserContext = createContext({});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [persistLogin, setPersistLogin] = React.useState(JSON.parse(localStorage.getItem("persist")) || false);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, persistLogin, setPersistLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
