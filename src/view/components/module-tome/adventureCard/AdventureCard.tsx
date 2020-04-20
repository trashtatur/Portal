import * as React from 'react';
import {ReactNode} from 'react';
import {RoutesEnum} from "../../../service/RoutesEnum";
import {Link} from 'react-router-dom'
import * as style from './adventureCard.css';

interface AdventureCardProps {
    adventureId: string;
    name: string;
    core: string;
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
            <Link
                to={RoutesEnum.SINGLE_ADVENTURE.replace(':adventureId',this.props.adventureId)}
                className={style.adventureCardLink}
            >
                <div className={style.adventureCardContainer}>
                    <div className={style.adventureName}>
                        {this.props.name}
                    </div>
                    <div className={style.adventureCore}>
                        {this.cutCoreShort()}
                    </div>
                </div>
            </Link>
        )
    }
}