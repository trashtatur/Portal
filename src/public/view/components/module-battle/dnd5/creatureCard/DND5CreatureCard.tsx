import * as React from 'react';
import {ReactNode} from 'react';
import {CreatureViewModel} from "../../../../../model/CreatureViewModel";
import {DND5CreaturePropertiesViewModel} from "../../../../../model/dnd5/DND5CreaturePropertiesViewModel";

interface DND5CreatureCardProps {
    creature: CreatureViewModel<DND5CreaturePropertiesViewModel>
}

interface DND5CreatureCardState {

}

export class DND5CreatureCard extends React.Component<DND5CreatureCardProps, DND5CreatureCardState> {

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}