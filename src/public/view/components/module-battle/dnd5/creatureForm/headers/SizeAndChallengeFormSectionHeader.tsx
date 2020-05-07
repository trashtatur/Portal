import * as React from 'react';
import {ReactNode} from 'react';
import {TypeEnum} from "../../../../../../model/enumeration/TypesEnum";
import {DND5CreatureSizesEnum} from "../../../../../../model/enumeration/dnd5/DND5CreatureSizesEnum";
import * as style from "../dnd5CreatureForm.css";

interface SizeAndChallengeFormSectionHeaderProps {
    size: DND5CreatureSizesEnum | null;
    challenge: number | null;
    type: TypeEnum;
}

export class SizeAndChallengeFormSectionHeader extends React.Component<SizeAndChallengeFormSectionHeaderProps, {}> {

    checkIfChallengeCanBeOmitted = (): boolean => {
        if (this.props.type === TypeEnum.ALLY || this.props.type === TypeEnum.PLAYER) {
            return true
        }

    }

    render(): ReactNode {
        return (
            <>
                {
                    this.checkIfChallengeCanBeOmitted()
                    && this.props.size === DND5CreatureSizesEnum.NONE
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Size</span>
                    </span>
                }
                {
                    !this.checkIfChallengeCanBeOmitted()
                    && (this.props.size === DND5CreatureSizesEnum.NONE
                        || this.props.challenge === null
                    )
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Challenge & Size</span>
                    </span>

                }
                {
                    this.checkIfChallengeCanBeOmitted()
                    && this.props.size !== DND5CreatureSizesEnum.NONE
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Size</span>
                    </span>
                }
                {
                    this.props.size !== DND5CreatureSizesEnum.NONE
                    && !this.checkIfChallengeCanBeOmitted()
                    && this.props.challenge !== null
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Challenge & Size</span>
                    </span>
                }
            </>
        )
    }
}