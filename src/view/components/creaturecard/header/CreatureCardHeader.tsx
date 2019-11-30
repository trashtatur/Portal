import * as React from "react";
import {CSSProperties} from "react";
import * as styles from './creaturecardHeader.module.css'

export interface ICreatureCardHeaderProps {
    name:string;
    label?:number;
    alignment: string;
    challenge: number;
    preview?:boolean;
}

export interface ICreatureCardHeaderState {

}

export class CreatureCardHeader extends React.Component<ICreatureCardHeaderProps, ICreatureCardHeaderState> {

    constructor(props) {
        super(props);
        this.ifPreview = this.ifPreview.bind(this);
    }

    ifPreview():CSSProperties {
        if (this.props.preview) return {
            height:"10em"
        };
        return {}
    }


    render(): any {
        return (
            <div className={styles.cardTopContainer}>
                <div className={styles.cardTop} style={this.ifPreview()}>
                    <div className={styles.nameContainer}>
                        <h1 className={styles.name}>{this.props.name}</h1>
                        <h1 className={styles.label}>{this.props.label==0? "":this.props.label}</h1>
                        <div className={styles.edge}/>
                    </div>
                    <div className={styles.nextToNameContainer}>
                        <p className={styles.alignment}>{this.props.alignment}</p>
                        <p className={styles.challenge}>CHALLENGE: {this.props.challenge}</p>
                    </div>
                </div>
            </div>
        )
    }
}