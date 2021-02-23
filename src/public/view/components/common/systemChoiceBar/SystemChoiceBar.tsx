import * as React from 'react';
import {ReactNode} from 'react';
import {SystemsEnum} from "../../../../enumeration/SystemsEnum";
import {Chip} from "@/public/view/components/uiBasic/chip/chip.component";
import * as style from './systemChoiceBar.css'
import {ColorModeEnum} from "@/public/enumeration/ColorModeEnum";

interface SystemChoiceBarProps {
    setSystem: Function;
}

export class SystemChoiceBar extends React.Component<SystemChoiceBarProps, {}> {

    render(): ReactNode {
        return (
            <div className={style.systemChoiceBarContainer}>
                <Chip colorMode={ColorModeEnum.LIGHT_GREY} hoverEffect>
                    <img
                        className={style.systemElementImage}
                        onClick={() => this.props.setSystem(SystemsEnum.DND5)}
                        src={'images/systemLogos/DND5.png'}
                        alt={"DND5 Logo"}
                    />
                </Chip>
                <Chip  colorMode={ColorModeEnum.LIGHT_GREY} hoverEffect>
                    <img
                        className={style.systemElementImage}
                        onClick={() => this.props.setSystem(SystemsEnum.PATHFINDER)}
                        src={'images/systemLogos/pathfinder.jpg'}
                        alt={"DND5 Logo"}
                    />
                </Chip>
            </div>
        )
    }
}