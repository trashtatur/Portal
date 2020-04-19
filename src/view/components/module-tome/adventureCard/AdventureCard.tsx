import * as React from 'react';
import {ReactNode} from 'react';
import * as style from './adventureCard.css';

interface AdventureCardProps {
    adventureId: string;
    name: string;
    core: string;
    openAdventure: Function;
}

interface AdventureCardState {

}

export class AdventureCard extends React.Component<AdventureCardProps, AdventureCardState> {

    cutCoreShort = (): string => {
        if (this.props.core.length >= 225) {
            return `${this.props.core.substr(0, 225)} ...`
        }
        return this.props.core
    };

    render(): ReactNode {
        return (
            <div className={style.adventureCardContainer} onClick={(): void=>this.props.openAdventure(this.props.adventureId)}>
                <div className={style.adventureName}>
                    {this.props.name}
                </div>
                <div className={style.adventureCore}>
                    {this.cutCoreShort()}
                </div>
            </div>
        )
    }
}