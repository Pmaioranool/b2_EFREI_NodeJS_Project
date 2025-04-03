import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "./components/userContext";

const Logout = () => {
  const router = useRouter();
  const { logout } = useContext(UserContext);

  useEffect(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  return null;

  //   useEffect(() => {
  //     // Remove the token from localStorage
  //     localStorage.removeItem("token");
  //     // Redirect to the login page
  //     router.push("/login");
  //   }, [router]);

  //   return null; // Optionally, you can return a loading message or spinner
};

export default Logout;
