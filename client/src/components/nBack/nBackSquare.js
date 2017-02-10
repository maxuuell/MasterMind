const checkLitSquare = (litSquare, id) => {
  if (litSquare === id) {
    return "lit";
  } else {
    return "notLit";
  }
}

var divStyle = {
  boxStyle: 'border-box',
  height: '100px',
  width: '32%',
  display: 'inline-block',
  margin: '2px'
};


export const NBackSquare = ({litSquare, squareId}) => {
  return(
    <div className={checkLitSquare(litSquare, squareId)} style={divStyle}></div>
  )
}
