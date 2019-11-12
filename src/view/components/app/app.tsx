import * as React from "react";
import {CreatureCard} from "../creaturecard/CreatureCard";


export class App extends React.Component {

    public render(): any {
        return <div>"Hello World. I do nothing right now"
               <CreatureCard/>
        </div>
    }
}