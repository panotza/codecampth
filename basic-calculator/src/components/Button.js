import React from 'react';

const Button = ({name, wide, orange, onClick}) => (
    <div className="component-button" style={{width: wide ? '75%' : '25%'}}>
      <button style={{backgroundColor: orange ? '#F5923E' : 'skyblue'}}
        onClick={() => onClick(name)}
      >
      {name}
      </button>
    </div>
);

export default Button;