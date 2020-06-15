import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";
import {SpeedViewModel} from "@/public/model/dataModel/SpeedViewModel";

interface HPSpeedAndACPlayerFormSectionProps {
    hp: string;
    changeHP: Function;
    ac: string;
    changeAC: Function;
    speed: SpeedViewModel;
    changeLandSpeed: Function;
    changeAirSpeed: Function;
    changeWaterSpeed: Function;
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