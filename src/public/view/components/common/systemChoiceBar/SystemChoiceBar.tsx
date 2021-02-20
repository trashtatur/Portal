import * as React from 'react';
import {ReactNode} from 'react';
import {SystemsEnum} from "../../../../enumeration/SystemsEnum";
import * as style from './systemChoiceBar.css'

interface SystemChoiceBarProps {
    setSystem: Function;
}

export class SystemChoiceBar extends React.Component<SystemChoiceBarProps, {}> {

    render(): ReactNode {
        return (
            <div className={style.systemChoiceBarContainer}>
                <img
                    className={style.systemElementImage}
                    onClick={() => this.props.setSystem(SystemsEnum.DND5)}
                    src={'images/systemLogos/DND5.png'}
                    alt={"DND5 Logo"}
                />
                <img
                    className={style.systemElementImage}
                    onClick={() => this.props.setSystem(SystemsEnum.PATHFINDER)}
                    src={'images/systemLogos/pathfinder.jpg'}
                    alt={"DND5 Logo"}
                />
            </div>
        )
    }
}