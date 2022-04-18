import React from "react";
import './style.css'

const Board = (props)=>{
    return(
             <div className="boardContainer">
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                return <tr key={rIndex} className={(row +1) %3 === 0 ? "bBorder":""}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                  return <td key={rIndex+cIndex} className={(col +1) %3 === 0 ? "rBorder":""}>
                    <input 
                      onChange={(e)=> props.textHandler(e,row, col)} 
                      value={props.data.length && props.data[row][col] === -1 ? '' : props.data.length && props.data[row][col]} 
                      className="cell"
                      disabled={props.data.length && props.data[row][col] !== -1}
                      />
                  </td>
                  })}
                </tr>
              })
            }

          </tbody>
        </table>
    </div>
    )
}

export default Board