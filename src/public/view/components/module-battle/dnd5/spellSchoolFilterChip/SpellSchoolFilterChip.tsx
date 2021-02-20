import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";
import {MagicSchoolColorEnum} from "@/public/model/enumeration/dnd5/MagicSchoolColorEnum";
import * as style from './spellSchoolFilterChip.css';

interface SpelSchoolFilterChipProps {
    name: MagicSchoolEnum;
    isActive: boolean;
    onClick: Function;
}

export class SpellSchoolFilterChip extends React.Component<SpelSchoolFilterChipProps> {

    determineStyle = (): CSSProperties => {
        let color = '';
        switch (this.props.name) {
            case MagicSchoolEnum.ABJURATION:
                color = MagicSchoolColorEnum.ABJURATION;
                break;
            case MagicSchoolEnum.CONJURATION:
                color = MagicSchoolColorEnum.CONJURATION;
                break;
            case MagicSchoolEnum.DIVINATION:
                color = MagicSchoolColorEnum.DIVINATION;
                break;
            case MagicSchoolEnum.ENCHANTMENT:
                color = MagicSchoolColorEnum.ENCHANTMENT;
                break;
            case MagicSchoolEnum.EVOCATION:
                color = MagicSchoolColorEnum.EVOCATION;
                break;
            case MagicSchoolEnum.ILLUSION:
                color = MagicSchoolColorEnum.ILLUSION;
                break;
            case MagicSchoolEnum.NECROMANCY:
                color = MagicSchoolColorEnum.NECROMANCY;
                break;
            case MagicSchoolEnum.TRANSMUTATION:
                color = MagicSchoolColorEnum.TRANSMUTATION;
                break;
            case MagicSchoolEnum.UNIVERSAL:
                color = MagicSchoolColorEnum.UNIVERSAL;
                break;
            default:
                break;
        }
        const opacity = this.props.isActive ? '100%' : '60%';
        return {backgroundColor: color, opacity: opacity}
    }

    render(): ReactNode {
        return (
            <div
                className={style.spellSchoolFilterChip}
                style={this.determineStyle()}
                onClick={() => this.props.onClick(this.props.name)}
            >
                <img
                    className={style.schoolLogo}
                    src={`images/dnd5/magicSchools/${this.props.name}.jpg`}
                    alt={'Magic school symbol'}
                />
                <div className={style.schoolName}>
                    {this.props.name}
                </div>
            </div>
        )
    }
}