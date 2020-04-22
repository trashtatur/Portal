import * as React from 'react';
import {ReactNode} from 'react';
import {SceneViewModel} from "../../../model/scene/SceneViewModel";
import {Graph} from "react-d3-graph";
import {sceneGraphData} from "../../componentTypes";
import * as style from './sceneGraph.css';

interface SceneGraphProps {
    scenes: Array<SceneViewModel>;
}

const graphConfig = {
    "automaticRearrangeAfterDropNode": false,
    "collapsible": true,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 200,
    "highlightDegree": 1,
    "highlightOpacity": 1,
    "linkHighlightBehavior": false,
    "maxZoom": 8,
    "minZoom": 0.1,
    "nodeHighlightBehavior": false,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": "900",
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 100,
        "linkStrength": 1,
        "disableLinkForce": false
    },
    "node": {
        "color": "#a1a0a0",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "#6c6b6b",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": "SAME",
        "labelProperty": "id",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": true,
        "size": 200,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "svg": "",
        "symbolType": "circle"
    },
    "link": {
        "color": "#b1b1b1",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
    }
}

export class SceneGraph extends React.Component<SceneGraphProps> {

    composeDataAsGraph = (): sceneGraphData => {
        const sceneData: sceneGraphData = {nodes: [], links: []};
        this.props.scenes.forEach(scene => {
            sceneData.nodes.push({id: scene.number})
            if (scene.parentScenes !== null && scene.parentScenes.length !== 0) {
                scene.parentScenes.forEach(parentScene => {
                    sceneData.links.push({
                        source: parentScene.number,
                        target: scene.number
                    })
                })
            }
        })
        return sceneData;
    };

    onLeftClickNode = (nodeId) => {
        alert(`Left clicked on ${nodeId}`)
    };

    onRightClickNode = (event, nodeId) => {
        event.preventDefault()
        alert(`Right clicked on ${nodeId}`)
    };

    onLeftClickLink = (source, target) => {
        alert(`Left clicked on link between ${source} and ${target}`)
    };

    render(): ReactNode {
        return (
            <div className={style.sceneGraphContainer}>
                {this.props.scenes.length > 0 &&
                <Graph
                    id={'singleAdventure-sceneGraph'}
                    data={this.composeDataAsGraph()}
                    config={graphConfig}
                    onRightClickNode={this.onRightClickNode}
                    onClickNode={this.onLeftClickNode}
                    onClickLink={this.onLeftClickLink}
                />
                }
            </div>
        )
    }
}