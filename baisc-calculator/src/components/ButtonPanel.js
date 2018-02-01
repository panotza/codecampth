import React from 'react';
import Button from './Button';

const ButtonPanel = ({onClick}) => (
  <div className="component-button-panel">
    <div>
      <Button name="AC" onClick={onClick} wide={true}/>
      <Button name="÷" onClick={onClick} orange={true} />
    </div>
    <div>
      <Button name="7" onClick={onClick} />
      <Button name="8" onClick={onClick} />
      <Button name="9" onClick={onClick} />
      <Button name="x" onClick={onClick} orange={true} />
    </div>
    <div>
      <Button name="4" onClick={onClick} />
      <Button name="5" onClick={onClick} />
      <Button name="6" onClick={onClick} />
      <Button name="-" onClick={onClick} orange={true} />
    </div>
    <div>
      <Button name="1" onClick={onClick} />
      <Button name="2" onClick={onClick} />
      <Button name="3" onClick={onClick} />
      <Button name="+" onClick={onClick} orange={true} />
    </div>
    <div>
      <Button name="0" onClick={onClick} wide={true}/>
      <Button name="=" onClick={onClick} orange={true}/>
    </div>
  </div>
);

export default ButtonPanel;