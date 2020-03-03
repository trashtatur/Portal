import * as React from 'react'
import Collapsible from 'react-collapsible';
import {YoutubePlayer} from "./youtube/YoutubePlayer";
import {ReactElement} from "react";
import * as style from './mediaBar.css'

export class MediaBar extends React.Component {

    render(): ReactElement {
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