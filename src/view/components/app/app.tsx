import * as React from "react";
import {CreatureCard} from "../creaturecard/CreatureCard";


export class App extends React.Component {

    public render(): any {
        return (<div><CreatureCard name={'Ancient Bugbear'}
                                hitpoints={12}
                                challenge={12}
                                armorclass={12}
                                alignment={"neutral"}
                                baseAtk={1}
                                creatureClass={"goblinoid"}
                                ini={12}
                                movement={12}
                                saveThrows={{"ref":12,"will":12,"fort":12}}
                                size={"kolossal"}
                                stats={{"str":16,"dex":2,"wis":10,"int":10,"cha":10,"con":10}}
                                kmb={3}
                                kmv={14}
                                languages={["Gemeinsprache","Orkisch"]}
                                senses={["Dunkelsicht"]}
                                skills={["Schleichen +6"]}
                                talents={["Geschick"]}
                                actions={['Waffe 1w6']}
               />
        </div>
        )
    }
}