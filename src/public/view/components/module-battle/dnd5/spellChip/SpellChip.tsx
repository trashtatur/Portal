import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {MagicSchoolEnum} from "@/public/model/enumeration/dnd5/MagicSchoolEnum";
import {MagicSchoolColorEnum} from "@/public/model/enumeration/dnd5/MagicSchoolColorEnum";
import * as style from './spellChip.css'

interface SpellChipProps {
    id: string;
    name: string;
    level: number;
    school: MagicSchoolEnum;
    onClick: Function;
    onHover: Function;
}

export class SpellChip extends React.Component<SpellChipProps> {

    determineStyle = (): CSSProperties => {
        let color = '';
        switch (this.props.school) {
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
        return {backgroundColor: color}
    }

    render(): ReactNode {
        return (
            <>
                <div
                    className={style.spellChip}
                    style={this.determineStyle()}
                    onClick={() => this.props.onClick()}
                    onMouseOver={() => this.props.onHover()}
                >
                    <img src={`images/dnd5/magicSchools/${this.props.school}.jpg`} className={style.spellChipSchoolImage}/>
                    <span className={style.spellChipLevel}>{this.props.level}</span>
                    <span>{this.props.name}</span>
                </div>
            </>
        )
    }
}