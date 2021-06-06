import * as React from 'react';
import {ReactNode} from 'react';
import {CSSProperties} from "react";
import style from './flyUpContainer.css';

interface RollUpFormProps {
    open: boolean;
    closeHandler: Function;
}

export class FlyUpContainer extends React.Component<RollUpFormProps> {

    openSceneFormStyleChange = (): CSSProperties => {
        if (this.props.open) {
            return {
                top: '30%',
                minHeight: '70%',
                height: '70%',
                boxShadow: '0px -5px 33px -4px rgba(0,0,0,0.75)',
                opacity: 0.95
            }
        }
        return {
            top: '100%',
            minHeight: 0,
            height: 0,
            opacity: 0
        }
    };

    render(): ReactNode {
        return (
            <div className={style.flyUpContainer} style={this.openSceneFormStyleChange()}>
                <div className={style.topAreaContainer}>
                    <button
                        className={style.flyUpContainerCloseButton}
                        onClick={()=> this.props.closeHandler()}
                    >X</button>
                </div>
                {this.props.children}
            </div>
        )
    }
}