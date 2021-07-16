import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const NoMatch = () => {
    return (
        <div style={{marginTop: "10vh"}}>
            <h3>Error (404)</h3>
            <Link to="/"><button>Go back home</button></Link>
        </div>
    );
};

export default NoMatch;