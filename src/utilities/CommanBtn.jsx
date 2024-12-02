function CommonBtn(props) {
    return (
      <div 
        onClick={props.clicked}  // Directly pass the clicked function here
        className={`hover:scale-105 duration-300 text-center cursor-pointer px-5 py-2 border rounded text-sm bg-${props.bgColor} text-${props.textColor}`}
      >
        {props.label}
      </div>
    );
  }

 export default CommonBtn; 