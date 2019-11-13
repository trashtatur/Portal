import * as React from "react";
import * as styles from './creaturecardHeader.module.css'

export interface ICreatureCardHeaderProps {
    name:string;
    alignment: string;
    challenge: number;
}

export interface ICreatureCardHeaderState {

}

export class CreatureCardHeader extends React.Component<ICreatureCardHeaderProps, ICreatureCardHeaderState> {


    render(): any {
        return (
            <div className={styles.cardTopContainer}>
                <div className={styles.cardTop}>
                    <div className={styles.nameContainer}>
                        <h1 className={styles.name}>{this.props.name}</h1>
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