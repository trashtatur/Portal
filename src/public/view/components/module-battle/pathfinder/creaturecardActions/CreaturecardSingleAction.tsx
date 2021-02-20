import * as React from "react";
import {ReactElement} from "react";
import {PathfinderActionViewModel} from "@/public/model/pathfinder/PathfinderActionViewModel";
import {CreaturecardSingleActionVisual} from "../../common/creaturecardSingleActionVisual/CreaturecardSingleActionVisual";
import * as style from './creaturecardAction.css';

export interface SingleActionProps {
    action: PathfinderActionViewModel;
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
                    fullDamageTypeString={this.props.action.damageTypes.getFullDamageTypeString()}
                    critMod={this.props.action.critMod}
                    additionalInfo={this.props.action.additionalInfo}
                />
            </div>
        )
    }
}