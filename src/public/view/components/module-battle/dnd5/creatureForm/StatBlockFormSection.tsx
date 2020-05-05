import * as React from 'react';
import {ReactNode} from 'react';

interface StatBlockFormSectionProps {
    strength: string;
    changeStrength: Function;
    dexterity: string;
    changeDexterity: Function;
    constitution: string;
    changeConstitution: Function;
    intelligence: string;
    changeIntelligence: Function;
    wisdom: string;
    changeWisdom: Function;
    charisma: string;
    changeCharisma: Function;
}

export class StatBlockFormSection extends React.Component<StatBlockFormSectionProps> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}