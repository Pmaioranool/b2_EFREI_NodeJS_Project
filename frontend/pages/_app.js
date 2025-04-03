import { UserProvider } from "./components/userContext";
import Layout from "./components/layout";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
