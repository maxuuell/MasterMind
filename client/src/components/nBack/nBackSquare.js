const checkLitSquare = (litSquare, id) => {
  console.log("Checking!")
  if (litSquare === id) {
    return "lit";
  } else {
    return "notLit";
  }
}

var divStyle = {
  backgroundColor: 'blue'
};


export const Square = ({litSquare, squareId}) => ({
    return (
      <div>
        <div className={checkLitSquare(litSquare, squareId)} style={divStyle}></div>
      </div>
    )
});
