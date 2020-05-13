import * as React from 'react';
import {ReactNode} from 'react';
import {ClassAndLevelViewModel} from "@/public/model/dataModel/ClassAndLevelViewModel";

interface ClassesAndLevelsFormSectionProps {
    classesAndLevels: ClassAndLevelViewModel[];
    changeClassesAndLevels: Function;
}

export class ClassesAndLevelsFormSection extends React.Component<ClassesAndLevelsFormSectionProps, {}> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}