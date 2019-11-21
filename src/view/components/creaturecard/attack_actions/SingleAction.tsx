import * as React from "react";
import {creatureAction} from "./CreatureActions";
import * as style from './creatureAction.module.css';

export interface ISingleActionProps {
    action: creatureAction
}

export interface ISingleActionState {

}

export class SingleAction extends React.Component<ISingleActionProps, ISingleActionState> {


    render(): any {
        return (
            <p className={style.actionTitle}>
                {this.props.action.name}&nbsp;
                <span className={style.action}>
                     {this.props.action.rangeType} Attack +{this.props.action.attackBonus} to hit, reach {this.props.action.range}&nbsp;
                    Hit {this.props.action.damage}(x{this.props.action.critmod}) {this.props.action.damageType} {this.props.action.additionalInfo}
             </span>
            </p>
        )
    }
}