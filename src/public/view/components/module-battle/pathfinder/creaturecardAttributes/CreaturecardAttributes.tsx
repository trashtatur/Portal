import * as React from "react";
import {ReactElement} from "react";
import {TalentToolTip} from "../toolTipTalent/TalentToolTip";
import {PathfinderSavingThrowsViewModel} from "@/public/model/pathfinder/PathfinderSavingThrowsViewModel";
import {PathfinderLanguageViewModel} from "@/public/model/pathfinder/PathfinderLanguageViewModel";
import {PathfinderTalentViewModel} from "@/public/model/pathfinder/PathfinderTalentViewModel";
import {PathfinderSkillViewModel} from "@/public/model/pathfinder/PathfinderSkillViewModel";
import {uuidv4} from "@/public/service/uuid.service";
import {ToolTip} from "@/public/view/components/uiBasic/tooltip/ToolTip";
import {Chip} from "@/public/view/components/uiBasic/chip/chip.component";
import {ColorModeEnum} from "@/public/enumeration/ColorModeEnum";
import * as style from './creaturecardAttributes.css';

export interface CreatureAttributesProps {
    skills: PathfinderSkillViewModel[];
    talents: PathfinderTalentViewModel[];
    languages: PathfinderLanguageViewModel[];
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
            return <Chip image="/images/combat-icon.png" colorMode={ColorModeEnum.LIGHT_GREY}>{cleanedName}</Chip>
        }
        return <Chip colorMode={ColorModeEnum.LIGHT_GREY}>{talentName}</Chip>
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
                                    position={'right'}
                                    toolTipTrigger={this.formatTalentName(talent.name)}
                                >
                                    <TalentToolTip talent={talent} />
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
                <tr>
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