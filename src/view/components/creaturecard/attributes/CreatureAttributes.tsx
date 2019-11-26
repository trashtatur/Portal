import * as React from "react";
import {saveThrowsType} from "../../componentTypes";
import * as style from './creatureAttributes.module.css'


export interface ICreatureAttributesProps {
    skills:string[],
    talents:string[],
    languages:string[],
    saveThrows: saveThrowsType
}

export interface ICreatureAttributesState {

}

export class CreatureAttributes extends React.Component<ICreatureAttributesProps,ICreatureAttributesState>{

    determineModPrefix(mod:number):string {
        if (mod>=0) return `+${mod}`;
        return `${mod};`
    }

    render(): any {
        return (
            <table className={style.attributeTable}>
                <tbody>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeName}>Skills:</td>
                        <td className={style.attributeEntry}>{this.props.skills.join(", ")}</td>
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