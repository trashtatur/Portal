import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import {SpeedModel} from "@/public/model/dataModel/SpeedModel";

interface HPSpeedAndACPlayerFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    speed: SpeedModel;
    changeSpeed: Function;
    classesAndLevels: ClassAndLevelViewModel[];
    changeHitDice: Function;
}

export class HPSpeedAndACPlayerFormSection extends React.Component<HPSpeedAndACPlayerFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}