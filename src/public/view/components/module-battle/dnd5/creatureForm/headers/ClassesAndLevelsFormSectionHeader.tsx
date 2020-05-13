import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import * as style from "@/public/view/components/module-battle/dnd5/creatureForm/dnd5CreatureForm.css";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";

interface ClassesAndLevelsFormSectionHeaderProps {
    classesAndLevels: ClassAndLevelViewModel[];
    type: TypeEnum;
}

export class ClassesAndLevelsFormSectionHeader extends React.Component<ClassesAndLevelsFormSectionHeaderProps, {}> {

    render(): ReactNode {
        return (
            <>
                {
                    this.props.classesAndLevels.length === 0
                    && this.props.type === TypeEnum.PLAYER
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Classes & Levels</span>
                    </span>
                }
                {
                    this.props.classesAndLevels.length !== 0
                    && this.props.type === TypeEnum.PLAYER
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Classes & Levels</span>
                    </span>
                }
            </>
        )
    }
}