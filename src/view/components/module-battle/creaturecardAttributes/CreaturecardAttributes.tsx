import * as React from "react";
import {saveThrowsType, talent} from "../../componentTypes";
import {ReactElement} from "react";
import {ToolTip} from "../../uiBasic/tooltip/ToolTip";
import {uuidv4} from "../../../service/helperFunctions";
import {TalentToolTip} from "../toolTipTalent/TalentToolTip";
import * as style from './creaturecardAttributes.css';

export interface CreatureAttributesProps {
    skills;
    talents: talent[];
    languages: string[];
    saveThrows: saveThrowsType;
    preview?: boolean;
}

export class CreaturecardAttributes extends React.Component<CreatureAttributesProps> {

    determineModPrefix(mod: number): string {
        if (mod >= 0) return `+${mod}`;
        return `${mod};`
    }

    formatSkillsIfPreview(): string {
        if (!this.props.preview) return this.props.skills.join(", ");
        return (
            this.props.skills.map(elem => {
                return `${elem.name} ${elem.level}`
            }).join(', ')
        )
    }

    formatTalentName = (talentName: string): ReactElement => {
        if (talentName.substr(talentName.length - 8) === '(combat)') {
            const cleanedName = talentName.substr(0, talentName.length - 8)
            return (
                <span className={style.talentEntry}>
                    {cleanedName}<img src={'/images/combat-icon.png'} className={style.combatTalentIcon}/>
                </span>)
        }
        return <span className={style.talentEntry}>{talentName}</span>
    };

    render(): ReactElement {
        return (
            <table className={style.attributeTable}>
                <tbody>
                <tr className={style.attributeBlock}>
                    <td className={style.attributeName}>Skills:</td>
                    <td className={style.attributeEntry}>{this.formatSkillsIfPreview()}</td>
                </tr>
                <tr className={style.attributeBlock}>
                    <td className={style.attributeName}>Talents:</td>
                    <td className={style.attributeEntry}>
                        {this.props.talents.map(talent => {
                            return (
                                <ToolTip
                                    key={uuidv4()}
                                    widthInPX={350}
                                    toolTipTrigger={<span
                                        className={style.talentEntry}>{this.formatTalentName(talent.name)}</span>}
                                >
                                    <TalentToolTip talent={talent}/>
                                </ToolTip>
                            )
                        })}
                    </td>
                </tr>
                <tr className={style.attributeBlock}>
                    <td className={style.attributeName}>Languages:</td>
                    <td className={style.attributeEntry}>{this.props.languages.join(", ")}</td>
                </tr>
                <tr className={style.attributeBlock}>
                    <td className={style.attributeName}>Save throws:</td>
                    <td className={style.attributeEntry}>
                        WIL:{this.determineModPrefix(this.props.saveThrows.will)} FORT:{this.determineModPrefix(this.props.saveThrows.fort)} REF:{this.determineModPrefix(this.props.saveThrows.ref)}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}