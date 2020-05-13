import * as React from "react";
import {ReactElement} from "react";
import {ActionViewModel} from "@/public/model/pathfinder/ActionViewModel";
import {CreaturecardSingleActionVisual} from "../../common/creaturecardSingleActionVisual/CreaturecardSingleActionVisual";
import * as style from './creaturecardAction.css';

export interface SingleActionProps {
    action: ActionViewModel;
}

export class CreaturecardSingleAction extends React.Component<SingleActionProps> {

    render(): ReactElement {
        return (
            <div className={style.singleAction}>
                <CreaturecardSingleActionVisual
                    name={this.props.action.name}
                    rangeType={this.props.action.rangeType}
                    attackBonus={this.props.action.attackBonus}
                    range={this.props.action.range}
                    fullDamageString={this.props.action.damage.getFullDiceRollString()}
                    fullDamageTypeString={this.props.action.damageType.getFullDamageTypeString()}
                    critMod={this.props.action.critMod}
                    additionalInfo={this.props.action.additionalInfo}
                />
            </div>
        )
    }
}