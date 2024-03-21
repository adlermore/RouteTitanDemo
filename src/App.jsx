import React, { useState, useEffect, createContext } from "react";
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import JsonContext from "./JsonContext";
import stopListJson from './stops_list.json';

function App() {

  const [stopListData, setStopListData] = useState(null);

  useEffect(() => {

    const data = stopListJson.reduce((acc, currentValue) => {
      acc[currentValue.sequence_number] = {
        ...currentValue,
        isCompleted: false
      };
      return acc
    }, {})

    setStopListData(data);
  }, []);

  const setCurrentStop = (sequence_number) => {
    setStopListData(prevData => ({
      ...prevData,
      [sequence_number]: {
        ...prevData[sequence_number],
        isCompleted: true
      }
    }));
  };

  return (
    <div className="app-wrapper">
      <Header />
      <JsonContext.Provider value={{stopListData , setCurrentStop}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </JsonContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
