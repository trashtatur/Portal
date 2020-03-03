import * as React from 'react'
import {ReactElement} from "react";

export interface VideoListItemProps {
    onVideoSelect: Function;
    video;
}

export class VideoListItem extends React.Component<VideoListItemProps> {

    imageUrl = this.props.video.snippet.thumbnails.default.url;

    render(): ReactElement {
        return (
            <li onClick={() => this.props.onVideoSelect(this.props.video)} className="list-group-item">
                <div className="video-list media">
                    <div className="media-left">
                        <img className="media-object" src={this.imageUrl} />
                    </div>
                    <div className="media-body">
                        <div className="media-heading">{this.props.video.snippet.title}
                        </div>
                    </div>
                </div>
            </li>
        )
    }

}