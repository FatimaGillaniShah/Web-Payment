import React from 'react'
import spinner from '../content/img/puff.svg';
import '../content/css/overlay.css';

const Spinner = props =>
<div className="fadeMe">
   
<div className="spinnerDiv">
    <img src={spinner}/>
</div>
</div>

export default Spinner;