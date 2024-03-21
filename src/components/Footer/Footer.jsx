
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import { NavLink } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="page_footer">
            <div className="router_line">
                <NavLink to="/" exact="true" activeclassname="active">
                    <LocalShippingIcon />
                    Route
                </NavLink>
                <NavLink to="/map" >
                    <MapIcon />
                    Map
            </NavLink>
        </div>
        </footer >
    )
}

export default Footer;














