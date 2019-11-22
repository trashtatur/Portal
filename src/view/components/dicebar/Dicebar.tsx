import * as React from "react";

const Popup = require('reactjs-popup');
import * as style from './dicebar.module.css';

export interface IDicebarProps {

}

export interface IDicebarState {
    dieValue: string
}

export class Dicebar extends React.Component<IDicebarProps, IDicebarState> {

    constructor(props) {
        super(props);
        this.state = {
            dieValue: null
        }
        this.setDiceResult = this.setDiceResult.bind(this);
    }


    setDiceResult(diceType: 4 | 6 | 8 | 10 | 12 | 20) {
        let min = 1;
        this.setState({dieValue: (Math.floor(Math.random() * (diceType - min + 1)) + min).toString()})
    }

    render(): any {
        return (
            <div className={style.diceBarContainer}>
                <img src={'images/dice/d4.png'} className={style.dieImage} alt={"d4"}
                     onClick={() => this.setDiceResult(4)}/>
                <img src={'images/dice/d6.png'} className={style.dieImage} alt={"d6"}
                     onClick={() => this.setDiceResult(6)}/>
                <img src={'images/dice/d8.png'} className={style.dieImage} alt={"d8"}
                     onClick={() => this.setDiceResult(8)}/>
                <img src={'images/dice/d10.png'} className={style.dieImage} alt={"d10"}
                     onClick={() => this.setDiceResult(10)}/>
                <img src={'images/dice/d12.png'} className={style.dieImage} alt={"d12"}
                     onClick={() => this.setDiceResult(12)}/>
                <img src={'images/dice/d20.png'} className={style.dieImage} alt={"d20"}
                     onClick={() => this.setDiceResult(20)}/>
                <p className={style.diceResult}>{this.state.dieValue}</p>
            </div>
        )
    }
}