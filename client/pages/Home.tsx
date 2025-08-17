import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Home() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/home")
    }
  }, [])
  return (
    <>
      <Sidebar/>
      <h1>HOMEPAGE</h1>
    </>
  );
}

export default Home;
