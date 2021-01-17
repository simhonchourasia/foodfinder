import React from 'react';
import './SwipeButtons.css';
import * as Io5Icons from "react-icons/io5";
import * as IoIcons from "react-icons/io";
import { IconButton } from '@material-ui/core';

function SwipeButtons() {
    return <div className="swipeButtons">
        <IconButton className="swipeButtons__left">
            <div className="theX">
                <Io5Icons.IoClose />
            </div>
            {/* <CloseIcon fontSize="large"/> */}
        </IconButton>
        <IconButton className="swipeButtons__right">
             <div className="theHeart">
                <IoIcons.IoIosHeart style={{fill: '#55c16e'}}/>
            </div>
            {/* <FavoriteIcon fontSize="large"/> */}
        </IconButton>
    </div>
}

export default SwipeButtons;