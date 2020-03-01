import * as React from 'react'
import Collapsible from 'react-collapsible';
import {YoutubePlayer} from "./youtube/YoutubePlayer";
import * as style from './mediaBar.css'

export interface IMediaBarProps {

}

export interface IMediaBarState {

}


export class MediaBar extends React.Component<IMediaBarProps, IMediaBarState> {


    render(): any {
        return (
            <Collapsible className={style.mediaBarContainer}
                         openedClassName={style.mediaBarContainer}
                         trigger={"♫"}
                         triggerClassName={style.trigger}
                         triggerOpenedClassName={style.triggerOpened}>
                <YoutubePlayer/>
            </Collapsible>
        )

    }

}