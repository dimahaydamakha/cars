import Sidebar from "../components/Sidebar.js"
import { useLocation } from 'react-router-dom';

function View() {
    const location = useLocation();
    const receivedData = location.state;

    return (
      <>
      <Sidebar/>
      <h1>VIEWPAGE</h1>
      {console.log(receivedData)}
      </>
    );
  }
  
export default View;