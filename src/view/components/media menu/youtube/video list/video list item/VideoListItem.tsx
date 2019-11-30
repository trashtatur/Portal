import * as React from 'react'

export interface IVideoListItemProps {
    onVideoSelect:Function
    video

}

export interface IVideoListItemState {

}

export class VideoListItem extends React.Component<IVideoListItemProps, IVideoListItemState> {

    imageUrl = this.props.video.snippet.thumbnails.default.url;

    render(): any {
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