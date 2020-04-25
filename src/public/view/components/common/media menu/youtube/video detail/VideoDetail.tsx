import * as React from 'react'
import {ReactElement} from "react";

export interface VideoDetailProps {
    video;
}

export class VideoDetail extends React.Component<VideoDetailProps> {

    render(): ReactElement {

        const videoId = this.props.video == null ? "" : this.props.video.id.videoId;
        const url = videoId == null ? "" : `https://www.youtube.com/embed/${videoId}`;

        return (
            <div>
                {!this.props.video && (<div>..loading</div>)}
                {this.props.video && (
                    <div className="video-detail col-md-8">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={url}/>
                        </div>
                        <div className="details">
                            <div>{this.props.video.snippet.title}</div>
                            <div>{this.props.video.snippet.description}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}