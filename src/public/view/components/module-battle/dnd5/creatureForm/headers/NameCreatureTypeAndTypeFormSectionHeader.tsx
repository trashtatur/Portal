import * as React from 'react';
import {ReactNode} from 'react';
import {TypeEnum} from "../../../../../../model/enumeration/TypesEnum";
import * as style from "../dnd5CreatureForm.css";

interface InitialDND5CreatureFormSectionHeaderProps {
    name: string | null;
    type: string | null;
}

export class NameCreatureTypeAndTypeFormSectionHeader extends React.Component<InitialDND5CreatureFormSectionHeaderProps, {}> {
    render(): ReactNode {
        return (
            <>
                {
                    (this.props.name === ''
                        || this.props.type === TypeEnum.NONE)
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span
                        className={style.formSectionHeader}>
                        Name{(this.props.type === TypeEnum.MONSTER || this.props.type === TypeEnum.SUMMON) && ', Creature Type '}& Type
                    </span>
                    </span>
                }
                {
                    this.props.name !== ''
                    && this.props.type !== TypeEnum.NONE
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>
                        Name{(this.props.type === TypeEnum.MONSTER || this.props.type === TypeEnum.SUMMON) && ', Creature Type '} & Type
                    </span>
                    </span>
                }
            </>
        )
    }
}