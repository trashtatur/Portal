import * as React from 'react'
import {VideoListItem} from "./video list item/VideoListItem";
import {ReactElement} from "react";

export interface VideoListProps {
    videos;
    onVideoSelect;
}

export class VideoList extends React.Component<VideoListProps> {

    render(): ReactElement {
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