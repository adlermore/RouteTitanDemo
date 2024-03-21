import React, { useContext, useEffect, useState } from 'react';
import '../assets/scss/HomePage/_homePage.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DirectionsIcon from '@mui/icons-material/Directions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import JsonContext from '../JsonContext';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const {stopListData , setCurrentStop} = useContext(JsonContext);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])

  const handleComplete = (sequence_number)=>{
    setCurrentStop(sequence_number)
  }
  if (loading) {
    return (
      <div className='homepage loading_home'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div> 
    )
  }

  return (
    <div className='homepage'>
      <div className="stop_list">
        {Object.values(stopListData).map((stop , index) => (
          <Accordion key={index} expanded={expanded === `panel${stop.sequence_number}`} onChange={handleChange(`panel${stop.sequence_number}`)}
            className={expanded === `panel${stop.sequence_number}` ? 'active acardion_block' : 'acardion_block'}
            disabled={stop.isCompleted}
          >
            <AccordionSummary
              aria-controls="panel1-content"
              id={`panel${stop.sequence_number}`}
            >
              <div className="button_info">
                <span className='active_decor'></span>
                <div className="info_row">
                  <div className="count_square">{stop.sequence_number}</div>
                  <div className="stop_title">{stop.street}</div>
                  <div className="stop_time">{stop.eta}</div>
                </div>
                <div className="info_row bottom_row">
                  <div className="zip_address">{stop.zip} {stop.city}</div>
                  <div className="time_delay">{stop.time_window}</div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="buttons_line">
                <Link to="/map" className='direction_btn'>
                  <DirectionsIcon />
                </Link>
                <Link to="/map"  className="complete_btn" onClick={()=>handleComplete(stop.sequence_number)} >
                  <DoneAllIcon />
                  Complete
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div >
  )
}

export default HomePage;