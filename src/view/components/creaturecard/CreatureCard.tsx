import * as React from "react";
import * as styles from './creaturecard.module.css'

export class CreatureCard extends React.Component{


    render():any {
        return <div className={styles["cardContainer"]}>
            <div className={styles.nameContainer}>
                <h1 className={styles.name}>Bugbear</h1>
                <div className={styles.edge}/>
            </div>
            <div className="right">
                <p className={styles.attitude}>Test</p>
                <p className={styles.challenge}>Test</p>
            </div>
        </div>
    }
}