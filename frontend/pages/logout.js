import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                router.push("/");
            }
        }
    }, [router]);

    return null; // No UI needed for logout
};

export default Logout;
