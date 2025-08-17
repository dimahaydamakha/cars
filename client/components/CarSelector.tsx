import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import React from 'react';
import { carYears } from '../constants' 
import { Button } from '@mui/material';
import { data, useNavigate } from 'react-router-dom';


interface CarSelectorProps {
  make: string
  setMake: React.Dispatch<React.SetStateAction<string>>
  model: string
  setModel: React.Dispatch<React.SetStateAction<string>>
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
}

interface TrimResponse {
  id: number
  description: string
  msrp: number
  invoice: number
}

export function CarSelector({make, setMake, model, setModel, year, setYear}: CarSelectorProps) {
  const [carMakes, setCarMakes] = useState<string[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [carTrims, setCarTrims] = useState<TrimResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
      fetchCarMakes(); 
  }, []);

  useEffect(() => {
    setModel("")
    setYear("")
    make && fetchCarModels(make); 
  }, [make]);

  useEffect(() => {
    !model && setYear("")
  }, [model])

  const fetchCarMakes = async () => {
    try {
        const response = await fetch('http://localhost:8000/get_makes/')
        if (!response.ok) {
            throw new Error(`Error when making a call to the backend for car makes! status: ${response.status}`);
          }
        const data: string[] = await response.json() as string[]
        setCarMakes(data);
    } catch (error) {
        console.error("Unable to fetch data from the backend for car makes: ", error)
    }
  }

  const fetchCarModels = async (make: string) => {
    try {
        const response = await fetch(`http://localhost:8000/get_models?make=${make}`)
        if (!response.ok) {
            throw new Error(`Error when making a call to the backend for car models! status: ${response.status}`);
          }
        const data: string[] = await response.json() as string[]
        setCarModels(data);
    } catch (error) {
        console.error("Unable to fetch data from the backend for car models: ", error)
    }
  } 

  const fetchCarTrims = async (make: string, model: string, year: string) => {
    try {
        const response = await fetch(`http://localhost:8000/get_trims?year=${year}&make=${make}&model=${model}`)
        if (!response.ok) {
            throw new Error(`Error when making a call to the backend for car trims! status: ${response.status}`);
          }
        const data: TrimResponse [] = await response.json()
        console.log(data)
        setCarTrims(data);
    } catch (error) {
        console.error("Unable to fetch data from the backend for car trims: ", error)
    }
  }

  const handleRedirect = () => {
    const dataToPass = {
      trims: carTrims
    };
    navigate('/view_car', { state: dataToPass});
  }

  return (
    <div style={{gap:"1rem",display:"flex", flexDirection:"column"}}>
    <Autocomplete
      value={make}
      disablePortal
      options={carMakes}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Make" />}
      onChange={(_event, value) => {setMake(value||"")}}
    />

    <Autocomplete
      disabled={!make}
      value={model}
      disablePortal
      options={carModels}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Model" />}
      onChange={(_event, value) => {setModel(value||"")}}
    />

    <Autocomplete
      disabled={!model||!make}
      value={year}
      disablePortal
      options={carYears}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Year" />}
      onChange={(_event, value) => {setYear(value||"")}}
    />

    <Button variant="outlined" onClick={() =>{
      fetchCarTrims(make, model, year);
      handleRedirect();
      }}
      disabled={!model||!make||!year}>Find Cars</Button>
  </div>
  );
}
