import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";

interface HPAndACPlayerFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    classesAndLevels: ClassAndLevelViewModel[];
    changeHitDice: Function;
}

export class HPAndACPlayerFormSection extends React.Component<HPAndACPlayerFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}