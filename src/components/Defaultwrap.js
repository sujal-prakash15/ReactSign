import {Fragment, useState,useRef} from 'react';
import logo from './logo512.png'
import React from "react";
const Defaultwrap=(props)=>{
    return(<Fragment>
        <span className="content">Begin <br/>Your <br/>Journey
    <a onClick={props.Change}>
    <svg xmlns="http://www.w3.org/2000/svg" className="sv" fill="none" viewBox="0 0 60 50" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg></a>
    </span><span className="content2"><img src={logo}/></span>
    </Fragment>
    )
}
export default Defaultwrap;