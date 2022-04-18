import React, { Component } from "react";
import Button from '../Button/button'
import './style.css'

const Labels = (props)=>{
    return(
        <div className="outerDiv">
        <div className="container">
        <p className="clrBlack">Generate:</p>
         <button 
            className="labelDesign" 
            onClick={props.onClick1}
        >
            {props.btnText1}
        </button>
         <button 
            className="labelDesign" 
            onClick={props.onClick2}
        >
            {props.btnText2}
        </button>
         <button 
            className="labelDesign" 
            onClick={props.onClick3}
        >
            {props.btnText3}
        </button>
         <button 
            className="labelDesign" 
            style={{backgroundColor: props.backgroundColor4}} 
            onClick={props.onClick4}
        >
            {props.btnText4}
        </button>
        <Button
          backgroundColor={"#fff"}
          onClick={props.onClickClear}
          border={'1px solid black'}
          btnText={"Clear"}
        />
        </div>
        </div>
    )
}

export default Labels