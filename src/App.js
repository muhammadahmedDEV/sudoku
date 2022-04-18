import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from './utils/axios';
import Labels from './components/Labels/labels'
import Button from './components/Button/button';
import Board from './components/Board/board';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const Sudoku = () => {

  const [data, setData] = useState([]);
  const [initial, setInitial] = useState([]);


  const copyData = (arr)=>{
    return JSON.parse(JSON.stringify(arr))
  }
  const structuredData = (data)=>{
    const raw = data;
      let arrayA = []
      let arrayB = []
      let arrayC = []
      let arrayD = []
      let arrayE = []
      let arrayF = []
      let arrayG = []
      let arrayH = []
      let arrayI = []
      for (let i = 1; i <= 9; i++) {
        let numberA = `A${i}`;
        if (raw.hasOwnProperty(numberA)) {
          arrayA.push(parseInt(raw[numberA]))
        }
        else {
          arrayA.push(-1)
        }

        let numberB = `B${i}`;
        if (raw.hasOwnProperty(numberB)) {
          arrayB.push(parseInt(raw[numberB]))
        }
        else {
          arrayB.push(-1)
        }

        let numberC = `C${i}`;
        if (raw.hasOwnProperty(numberC)) {
          arrayC.push(parseInt(raw[numberC]))
        }
        else {
          arrayC.push(-1)
        }

        let numberD = `D${i}`;
        if (raw.hasOwnProperty(numberD)) {
          arrayD.push(parseInt(raw[numberD]))
        }
        else {
          arrayD.push(-1)
        }

        let numberE = `E${i}`;
        if (raw.hasOwnProperty(numberE)) {
          arrayE.push(parseInt(raw[numberE]))
        }
        else {
          arrayE.push(-1)
        }

        let numberF = `F${i}`;
        if (raw.hasOwnProperty(numberF)) {
          arrayF.push(parseInt(raw[numberF]))
        }
        else {
          arrayF.push(-1)
        }

        let numberG = `G${i}`;
        if (raw.hasOwnProperty(numberG)) {
          arrayG.push(parseInt(raw[numberG]))
        }
        else {
          arrayG.push(-1)
        }

        let numberH = `H${i}`;
        if (raw.hasOwnProperty(numberH)) {
          arrayH.push(parseInt(raw[numberH]))
        }
        else {
          arrayH.push(-1)
        }

        let numberI = `I${i}`;
        if (raw.hasOwnProperty(numberI)) {
          arrayI.push(parseInt(raw[numberI]))
        }
        else {
          arrayI.push(-1)
        }
      }
      let finalArr = [ arrayA, arrayB, arrayC, arrayD, arrayE, arrayF, arrayG, arrayH, arrayI]
      
      setData(copyData(finalArr));
      setInitial(finalArr)

  }
  useEffect(() => {
    //to get by default easy mode sudoku
    axios.get('generate?difficulty=easy').then((res) => {
      let data = res.data && res.data.puzzle;
      structuredData(data)
    })
  }, []);



  const textHandler = (e,row,col)=>{
    var value = parseInt(e.target.value) || -1, grid = copyData(data);
    if (value === -1 || value >=1 && value <=9){
      grid[row][col] = value;
    }
    setData(grid);
  }

  // function to compare sudokus
  const compareSudokus = (current, solved) =>{
    let res = {
      isComplete: true,
      isSolveable: true
    }
    for(var i = 0; i < 9; i++){
      for (var j = 0; j < 9; j++){
        if(current[i][j] != solved[i][j]){
          if(current[i][j] != -1){
            res.isSolveable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }
  //function to check sudoku is valid or not
  const checkSudoku = ()=>{
    let sudo = copyData(initial);
    solver(sudo);
    let compare = compareSudokus(data, sudo)
    if(compare.isComplete){
      toast.success('congrats you have completed!');
    } else if(compare.isSolveable){
       toast.success('Please keep going');
    } else {
      toast.error('Please enter correct number!');
    }
  }
  const checkRow = (grid, row, num)=>{
    return grid[row].indexOf(num) === -1
  }

  //check num is unique in col
  const checkCol = (grid, col, num)=>{
    return grid.map(row =>row[col]).indexOf(num) === -1;
  }

  //check num is unique in box
  const checkBox = (grid, row, col, num)=>{
    //get box start index
    let boxArr = [],
    rowStart = row - (row%3),
    colStart = col - (col%3);
    for(let i=0; i < 3; i++){
      for(let j=0; j < 3; j++){
        //get all the cell numbers and push to boxArr
        boxArr.push(grid[rowStart + i][colStart + j])
      }
    }
    return boxArr.indexOf(num) === -1
  }
  const checkValid = (grid, row, col, num)=>{
    //num should be unique in row, col and in the square 3x3
    if(checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)){
      return true;
    }
   return false
  }
  const getNext=(row, col)=>{
    // if col reaches 8, increase row number
    //if col doesn't reach 8 , increase col umber
    //if row and col reaches 8, next will be  [0, 0]
    return col !== 8 ? [row,col+1] : row != 8 ? [row+1, 0] : [0, 0];
  }
  // recursive function to solve sudoku
  const solver = (grid, row=0, col=0)=>{

    // if current cell is already filled, move to next cell
    if(grid[row][col] !== -1){
      // for last cell, dont solve it
      let isLast = row >= 8 && col >=8;
      if(!isLast){
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol)
      }   

    }
    for(let num = 1; num <= 9; num++){
      //checck if this num is satisfying sudoku constraints
      if(checkValid(grid, row, col, num)){
        // fill the num in that cell
        grid[row][col] = num;
        //get next cell and repeat the function
        let [newRow, newCol] = getNext(row,col);
         if(!newRow && !newCol){
           return true;
         }
         if(solver(grid, newRow, newCol)){
          return true;
         }
      }
    }
    // if its in valid fill with -1
    grid[row][col] = -1;
    return false;
  }
  // function to solve the soduko by navigate to each cell
  const solveSudoku = ()=>{
    let sudo = copyData(initial);
    solver(sudo);
    setData(sudo);

  }
  //function to reet the sudoku
  const resetSudoku = ()=>{
    let sudo = copyData(initial);
    setData(sudo);
  }
// to change mode of sudoku
  const changeModeHandler = (mode)=>{
 axios.get(`generate?difficulty=${mode}`).then((res) => {
      console.log(res.data && res.data.difficulty, 'mode')
      console.log(res.data && res.data.puzzle, 'puzzle');
      let data = res.data && res.data.puzzle;
      structuredData(data)
    })
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="heading">SuGOku</h3>
        <Board
          data={data}
          textHandler={(e,row,col)=> textHandler(e,row, col)}
        />
        <Labels 
          btnText1="Easy"
          btnText2="Medium"
          btnText3="Hard"
          btnText4="Random"
          onClick1={()=>changeModeHandler('easy')}
          onClick2={()=>changeModeHandler('medium')}
          onClick3={()=>changeModeHandler('hard')}
          onClick4={()=>changeModeHandler('random')}
          onClickClear={resetSudoku}
        />
        <div className="buttonContainer">
          <Button
          onClick={checkSudoku}
          btnText={"Check"}
          backgroundColor={"#5299ff"}
          color={"#fff"}
          width={"150px"}
          />
          <Button
          onClick={solveSudoku}
           btnText={"Solve"}
           backgroundColor={"#000"}
           color={"#fff"}
           width={"150px"}
          />
        </div>
      </header>
      <ToastContainer />
    </div>
  );
}

export default Sudoku;
