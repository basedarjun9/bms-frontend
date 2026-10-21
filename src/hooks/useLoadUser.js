import { useEffect, useState } from "react";
import { getUser } from "../apis";
import { useAuth } from "../context/AuthContext";

export const useLoadUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, setAuth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUser();

        // Store the actual user object
        setUser(data.user);
        setAuth(true);
      } catch (error) {
        console.log("Failed to load user:", error);
        setUser(null);
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setUser, setAuth]);

  return { isLoading };
};