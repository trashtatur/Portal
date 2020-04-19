import * as React from 'react';
import {ReactNode} from 'react';
import {SceneViewModel} from "../../../model/scene/SceneViewModel";

interface SceneGraphProps {
    scenes: Array<SceneViewModel>;
}

interface SceneGraphState {

}

export class SceneGraph extends React.Component<SceneGraphProps, SceneGraphState> {

    render(): ReactNode {
        return (
            <></>
        )
    }
}