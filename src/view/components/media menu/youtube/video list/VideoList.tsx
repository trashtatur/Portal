import * as React from 'react'
import {VideoListItem} from "./video list item/VideoListItem";

export interface IVideoListProps {
    videos
    onVideoSelect
}

export interface IVideoListState {

}

export class VideoList extends React.Component<IVideoListProps, IVideoListState> {


    render(): any {
        return (
            this.props.videos.map(video => {
                return (
                    <VideoListItem
                        onVideoSelect = {this.props.onVideoSelect}
                        key={video.etag}
                        video={video}
                    />
                )
            })
        )
    }

}