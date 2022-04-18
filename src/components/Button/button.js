import React from "react";
import './style.css'

const Button = (props)=>{
    return(
         <button 
            className="button" 
            style={{backgroundColor: props.backgroundColor, ...props}} 
            onClick={props.onClick}
        >
            {props.btnText}
        </button>
    )
}

export default Button