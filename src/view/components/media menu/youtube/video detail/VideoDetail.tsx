import * as React from 'react'

export interface IVideoDetailProps {
    video
}

export interface IVideoDetailState {

}

export class VideoDetail extends React.Component<IVideoDetailProps, IVideoDetailState> {



    render(): any {

        let videoId = this.props.video == null ? "" : this.props.video.id.videoId;
        let url = videoId == null ? "" : `https://www.youtube.com/embed/${videoId}`;

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