import * as React from "react";
import {ReactElement} from "react";
import {ToolTip} from "../../../uiBasic/tooltip/ToolTip";
import {uuidv4} from "@/public/service/helperFunctions";
import {TalentToolTip} from "../toolTipTalent/TalentToolTip";
import {PathfinderSavingThrowsViewModel} from "@/public/model/pathfinder/PathfinderSavingThrowsViewModel";
import {LanguageViewModel} from "@/public/model/pathfinder/LanguageViewModel";
import {TalentViewModel} from "@/public/model/pathfinder/TalentViewModel";
import {SkillViewModel} from "@/public/model/pathfinder/SkillViewModel";
import * as style from './creaturecardAttributes.css';

export interface CreatureAttributesProps {
    skills: SkillViewModel[];
    talents: TalentViewModel[];
    languages: LanguageViewModel[];
    saveThrows: PathfinderSavingThrowsViewModel;
    preview?: boolean;
}

export class CreaturecardAttributes extends React.Component<CreatureAttributesProps> {

    determineModPrefix(mod: number): string {
        if (mod >= 0) return `+${mod}`;
        return `${mod};`
    }

    formatSkillsIfPreview(): string {
        if (!this.props.skills) {
            return ''
        }
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
                        {
                            this.props.talents &&
                            this.props.talents.map(talent => {
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
                    <td className={style.attributeEntry}>
                        {this.props.languages && this.props.languages.map(language => {return language.name}).join(', ')}
                    </td>
                </tr>
                <tr className={style.attributeBlock}>
                    <td className={style.attributeName}>Save throws:</td>
                    <td className={style.attributeEntry}>
                        WIL:{this.determineModPrefix(this.props.saveThrows.wisdom)} FORT:{this.determineModPrefix(this.props.saveThrows.fortitude)} REF:{this.determineModPrefix(this.props.saveThrows.reflex)}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}