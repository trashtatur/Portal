import * as React from 'react';
import {ReactElement} from 'react';
import {ToolTip} from "../tooltip/ToolTip";
import {CreatureToolTip} from "../../module-battle/common/toolTipCreature/CreatureToolTip";
import axios from "axios";

export interface CreatureSelectLabelProps {
    image: string;
    creature;
    labelText: string;
}

export class CreatureSelectLabel extends React.Component<CreatureSelectLabelProps> {

    render(): ReactElement {
        return (
            <div>
                <img src={`images/selectableLabelIcons/${this.props.image}`}
                     height="20px"
                     width="20px"
                     alt={"Selectable creature entry type"}
                />
                {this.props.labelText}
                <ToolTip position='right'>
                    <CreatureToolTip creature={this.props.creature}/>
                </ToolTip>
            </div>
        )
    }
}