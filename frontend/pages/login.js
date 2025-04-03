import dynamic from "next/dynamic";

const AuthForm = dynamic(() => import("./components/authForm"), { ssr: false });


export default function LoginPage() {
  return <AuthForm />;

}
