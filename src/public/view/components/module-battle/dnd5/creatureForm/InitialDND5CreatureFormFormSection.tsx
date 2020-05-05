import * as React from 'react';
import {ReactNode} from 'react';

interface InitialDND5CreatureFormFormSectionProps {
    name: string;
    challenge: string;
    changeName: Function;
    changeChallenge: Function;
}

export class InitialDND5CreatureFormFormSection extends React.Component<InitialDND5CreatureFormFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
                <label htmlFor={'creatureFormNameInput'}>Name</label>
                <input
                    id={'creatureFormNameInput'}
                    type={'text'}
                    value={this.props.name}
                    onChange={e => this.props.changeName(e)}
                />
                <label htmlFor={'creatureFormNameInput'}>Challenge</label>
                <input
                    id={'creatureFormChallengeInput'}
                    type={'number'}
                    value={this.props.challenge}
                    onChange={e => this.props.changeChallenge(e)}
                />
            </>
        )
    }
}