import * as React from "react";
import {saveThrowsType} from "../CreatureCard";
import * as style from './creatureAttributes.module.css'


export interface ICreatureAttributesProps {
    skills:string[],
    talents:string[],
    senses:string[],
    languages:string[],
    saveThrows: saveThrowsType
}

export interface ICreatureAttributesState {

}

export class CreatureAttributes extends React.Component<ICreatureAttributesProps,ICreatureAttributesState>{

    determineModPrefix(mod:number):string {
        if (mod>=0) return `+${mod}`;
        return `-${mod};`
    }

    render(): any {
        return (
            <table className={style.attributeTable}>
                <tbody>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeEntry}>Fertigk:</td>
                        <td className={style.attributeEntry}>{this.props.skills.toString()}</td>
                    </tr>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeEntry}>Talente:</td>
                        <td className={style.attributeEntry}>{this.props.talents.toString()}</td>
                    </tr>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeEntry}>Sinne:</td>
                        <td className={style.attributeEntry}>{this.props.senses.toString()}</td>
                    </tr>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeEntry}>Sprachen:</td>
                        <td className={style.attributeEntry}>{this.props.languages.toString()}</td>
                    </tr>
                    <tr className={style.attributeBlock}>
                        <td className={style.attributeEntry}>RWs:</td>
                        <td className={style.attributeEntry}>
                            WIL:{this.determineModPrefix(this.props.saveThrows.will)} ZÄH:{this.determineModPrefix(this.props.saveThrows.fort)} REF:{this.determineModPrefix(this.props.saveThrows.ref)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}