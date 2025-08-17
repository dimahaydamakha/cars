import "../src/App.css";
import {CarSelector} from '../components/CarSelector'
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Find() {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  return (
    <>
      <Sidebar/>
      <h1>CARS</h1>
      <CarSelector make={selectedMake} setMake={setSelectedMake} model={selectedModel} setModel={setSelectedModel} year={selectedYear} setYear={setSelectedYear}/>
    </>
  );
}

export default Find;
