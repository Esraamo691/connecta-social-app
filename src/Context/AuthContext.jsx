import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserData(token);
    } else {
      setDataProfile(null);
    }
  }, [token]);

  async function getUserData(token) {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: { token },
        },
      );
      if ((data.message = "success")) {
        setDataProfile(data.user);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{ token, setToken, dataProfile, setDataProfile }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
