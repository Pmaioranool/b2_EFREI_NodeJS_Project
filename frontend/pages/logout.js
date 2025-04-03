import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    router.push("/login");
  }, [router]);

  return null; // Optionally, you can return a loading message or spinner
};

export default Logout;