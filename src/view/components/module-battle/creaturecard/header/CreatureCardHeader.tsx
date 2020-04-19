import * as React from "react";
import {ReactElement} from "react";
import * as styles from './creaturecardHeader.css'

export interface CreatureCardHeaderProps {
    name: string;
    label?: number;
    alignment: string;
    challenge: number;
}

export class CreatureCardHeader extends React.Component<CreatureCardHeaderProps> {

    render(): ReactElement {
        return (
            <div className={styles.cardTopContainer}>
                <div className={styles.nameContainer}>
                    <h1 className={styles.name}>{this.props.name}</h1>
                    <h1 className={styles.label}>{this.props.label == 0 ? "" : this.props.label}</h1>
                    <div className={styles.edge}/>
                </div>
                <div className={styles.nextToNameContainer}>
                    <span className={styles.alignment}>{this.props.alignment}</span>
                    <span className={styles.challenge}>CHALLENGE: {this.props.challenge}</span>
                </div>
            </div>
        )
    }
}