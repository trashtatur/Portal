import * as React from 'react';
const _ = require('lodash');
let config = require('../../../../config.json');
const searchYoutube = require('youtube-api-v3-search');
import {VideoDetail} from "./video detail/VideoDetail";
import {VideoList} from "./video list/VideoList";
import {SearchBar} from "./searchbar/SearchBar";


export interface IYoutubePlayerProps {

}

export interface IYoutubePlayerState {
    videos:any[]
    selectedVideo
}

const API_KEY = config.youtube.api_key;

export class YoutubePlayer extends React.Component<IYoutubePlayerProps, IYoutubePlayerState> {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    componentDidMount(): void {
        this.videoSearch('ambient')
    }

    videoSearch(term) {
        searchYoutube(API_KEY, {q:term, type:"video", part:'snippet'}).then(videos =>{
            this.setState({
                videos: videos.items,
                selectedVideo: videos.items[0]
            });
        });
    }


    render(): any {

        const videoSearch = _.debounce(term => {
            this.videoSearch(term);
        }, 300);

        return (
            <div>
                <h5>Youtube Search:</h5><SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos}
                />
            </div>
        )

    }

}