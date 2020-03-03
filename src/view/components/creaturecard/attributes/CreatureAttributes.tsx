import * as React from "react";
import {saveThrowsType} from "../../componentTypes";
import {ReactElement} from "react";
import * as style from './creatureAttributes.css'

export interface CreatureAttributesProps {
    skills;
    talents: string[];
    languages: string[];
    saveThrows: saveThrowsType;
    preview?: boolean;
}

export class CreatureAttributes extends React.Component<CreatureAttributesProps> {

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
                    <td className={style.attributeEntry}>{this.props.talents.join(", ")}</td>
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