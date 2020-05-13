import * as React from 'react';
import {ReactNode} from 'react';
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {DND5CreatureSizeEnum} from "@/public/model/enumeration/dnd5/DND5CreatureSizeEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import * as style from "../dnd5CreatureForm.css";

interface SizeAndChallengeFormSectionHeaderProps {
    size: DND5CreatureSizeEnum | null;
    challenge: number | null;
    alignment: AlignmentEnum;
    type: TypeEnum;
}

export class SizeAlignmentAndChallengeFormSectionHeader extends React.Component<SizeAndChallengeFormSectionHeaderProps, {}> {

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
                    && (this.props.size === DND5CreatureSizeEnum.NONE || this.props.alignment === AlignmentEnum.NONE)
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Size & Alignment</span>
                    </span>
                }
                {
                    !this.checkIfChallengeCanBeOmitted()
                    && (this.props.size === DND5CreatureSizeEnum.NONE
                        || this.props.challenge === null
                        || this.props.alignment === AlignmentEnum.NONE
                    )
                    &&
                    <span className={style.formSectionCompletion}>
                        ☐<span className={style.formSectionHeader}>Size, Alignment & Challenge</span>
                    </span>

                }
                {
                    this.checkIfChallengeCanBeOmitted()
                    && this.props.size !== DND5CreatureSizeEnum.NONE
                    && this.props.alignment !== AlignmentEnum.NONE
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Size & Alignment</span>
                    </span>
                }
                {
                    this.props.size !== DND5CreatureSizeEnum.NONE
                    && !this.checkIfChallengeCanBeOmitted()
                    && this.props.challenge !== null
                    && this.props.alignment !== AlignmentEnum.NONE
                    &&
                    <span className={style.formSectionCompletion}>
                        ☑<span className={style.formSectionHeader}>Size, Alignment & Challenge</span>
                    </span>
                }
            </>
        )
    }
}