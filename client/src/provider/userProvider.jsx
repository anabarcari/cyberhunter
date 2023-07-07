import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export const useUserData = () => useContext(UserContext);
export const useUserUpdateData = () => useContext(UserUpdateContext);

const UserProvider = ({ children }) => {
  // Define the state or values you want to share
  const user = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(user) || null);

  return (
    // Provide the shared value through the context
    <UserContext.Provider value={userData}>
      <UserUpdateContext.Provider value={setUserData}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
