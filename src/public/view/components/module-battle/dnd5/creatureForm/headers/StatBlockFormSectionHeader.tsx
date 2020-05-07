import * as React from 'react';
import {ReactNode} from 'react';
import {DND5CreatureStatsModel} from "../../../../../../model/dataModel/dnd5/DND5CreatureStatsModel";
import * as style from "../dnd5CreatureForm.css";

interface StatBlockFormSectionHeaderProps {
    stats: DND5CreatureStatsModel;
}

export class StatBlockFormSectionHeader extends React.Component<StatBlockFormSectionHeaderProps, {}> {

    render(): ReactNode {
        return (
            <>
                {
                    (
                        this.props.stats.strength === null
                        || this.props.stats.dexterity === null
                        || this.props.stats.constitution === null
                        || this.props.stats.wisdom === null
                        || this.props.stats.intelligence === null
                        || this.props.stats.charisma === null
                    )
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Abilities</span>
                    </span>
                }
                {
                    (
                        this.props.stats.strength !== null
                        && this.props.stats.dexterity !== null
                        && this.props.stats.constitution !== null
                        && this.props.stats.wisdom !== null
                        && this.props.stats.intelligence !== null
                        && this.props.stats.charisma !== null
                    )
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Abilities</span>
                    </span>
                }
            </>
        )
    }
}