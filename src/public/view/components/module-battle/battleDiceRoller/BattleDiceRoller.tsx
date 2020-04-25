import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {CreatureViewModel} from "../../../../model/CreatureViewModel";
import * as style from './battleDiceRoller.css'

interface CombatDiceBarProps {
    allCreatures: CreatureViewModel[];
    changeCurrentACOfCreature: Function;
    changeCurrentHPOfCreature: Function;
    changeCurrentIniOfCreature: Function;
}

interface CombatDiceBarState {
    isOpen: boolean;
}

export class BattleDiceRoller extends React.Component<CombatDiceBarProps, CombatDiceBarState> {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleOpenChange = (): void => {
        this.setState({isOpen: !this.state.isOpen})
    };

    openCloseToggleStyle = (): CSSProperties => {
        if (this.state.isOpen) {
            return {minHeight: '100px'}
        }
        return {height: "0px", minHeight: "0px"}
    };

    render(): ReactNode {
        return (
            <div className={style.combatDiceBarContainer}>
                <button
                    className={style.combatDiceBarOpenToggleButton}
                    onClick={this.handleOpenChange}
                />
                <div className={style.combatDiceBarInput} style={this.openCloseToggleStyle()}>
                    <div className={style.inputWhichGroup}>

                    </div>
                    <div className={style.inputWhichEntities}>

                    </div>
                    <div className={style.inputWhichThrow}>

                    </div>
                    <div className={style.inputThrowResult}>

                    </div>
                    <div className={style.inputAfterAction}>

                    </div>
                </div>
            </div>
        )
    }
}