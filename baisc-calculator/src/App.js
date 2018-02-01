import React, { Component } from 'react';
import './App.css';
import ButtonPanel from './components/ButtonPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operands: [],
      display: '0'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    const number = '0123456789';
    const operator = '+-x÷';
    const operands = [...this.state.operands];
    const last = operands.length - 1;
    const lastOp = operands[last];
    switch (buttonName) {
      case 'AC':
        this.setState({ operands: [], display: 0 });
        break;
      case '=':
        if (operands.length === 0) {
          return;
        }
        if (operator.indexOf(lastOp) > -1) {
          operands.pop();
        }
        const sum = this.calculate(operands);
        this.setState({ operands: [sum === 'Cannot divided by 0' ? '0' : sum.toString()], display: sum });
        break;
      default:
        let operand = '0';
        if (number.indexOf(buttonName) > -1) {
          if (lastOp && operator.indexOf(lastOp) === -1) {
            operand = operands[last] + buttonName;
            operands[last] = operand;
          } else {
            operand = buttonName;
            operands.push(buttonName);
          }
        } else {
          if (lastOp) {
            if (operator.indexOf(lastOp) > -1) {
              operand = buttonName;
              operands[last] = operand;
            } else {
              operand = buttonName;
              operands.push(buttonName);
            }
          }
        }
        this.setState({ operands, display: operand });
        break;
    }
  }

  calculate(operands) {
    const operationOrder = ['x', '÷', '+', '-'];
    while (operands.length > 1) {
      for (let o of operationOrder) {
        let i = operands.length;
        while (i--) {
          if (operands[i] === o) {
            let left = +operands[i - 1];
            let right = +operands[i + 1];
            let sum = 0;
            switch (o) {
              case 'x':
                sum = left * right;
                break;
              case '÷':
                if (right === 0) {
                  return 'Cannot divided by 0';
                }
                sum = left / right;
                break;
              case '+':
                sum = left + right;
                break;
              case '-':
                sum = left - right;
                break;
              default:
                break;
            }
            operands.splice(i - 1, 3, sum);
          }
        }
      }
    }
  return operands[0];
}

render() {
  return (
    <div className="App">
      <div className="display">
        <p>{this.state.display}</p>
      </div>
      <ButtonPanel onClick={this.handleClick} />
    </div>
  );
}
}

export default App;
