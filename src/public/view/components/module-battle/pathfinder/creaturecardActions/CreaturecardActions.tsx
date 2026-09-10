import * as React from "react";
import {CreaturecardSingleAction} from "./CreaturecardSingleAction";
import {RedFadeLine} from "../../../uiBasic/redFadeLine/RedFadeLine";
import {ReactElement} from "react";
import type {PathfinderActionViewModel} from "@/public/model/pathfinder/PathfinderActionViewModel";
import {createPathfinderActionViewModel} from "@/public/model/pathfinder/PathfinderActionViewModel";
import * as style from './creaturecardAction.module.css';

export interface CreatureActionProps {
    actions: PathfinderActionViewModel[];
}

export class CreaturecardActions extends React.Component<CreatureActionProps> {

    render(): ReactElement {
        return (
            <div>
                <p className={style.preSeparator}>
                    Actions:
                </p>
                <RedFadeLine/>
                <div className={style.actionContainer}>
                    {   this.props.actions &&
                        this.props.actions.map((action, i) => {
                        return <CreaturecardSingleAction action={action} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}
