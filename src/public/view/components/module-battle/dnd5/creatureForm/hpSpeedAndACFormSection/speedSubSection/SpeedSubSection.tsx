import * as React from 'react';
import {ReactNode} from 'react';
import {SpeedViewModel} from "@/public/model/dataModel/SpeedViewModel";

interface SpeedSubSectionProps {
    speed: SpeedViewModel;
    changeLandSpeed: Function;
    changeAirSpeed: Function;
    changeWaterSpeed: Function;
}

export class SpeedSubSection extends React.Component<SpeedSubSectionProps> {

    render(): ReactNode {
        return (
            <>
                <label htmlFor={'dnd5CreatureForm--speed'}>Speed</label>
                <div id={'dnd5CreatureForm--speed'} style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <label htmlFor={'dnd5CreatureForm--speed--land'}>🚹</label>
                        <input
                            id={'dnd5CreatureForm--speed--land'}
                            onChange={e => this.props.changeLandSpeed(e)}
                            type={'number'}
                            style={{maxWidth: '45px'}}
                            max={99}
                            value={this.props.speed.land}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <label htmlFor={'dnd5CreatureForm--speed--air'}>🐦</label>
                        <input
                            id={'dnd5CreatureForm--speed--air'}
                            onChange={e => this.props.changeAirSpeed(e)}
                            type={'number'}
                            style={{maxWidth: '45px'}}
                            max={99}
                            value={this.props.speed.air}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <label htmlFor={'dnd5CreatureForm--speed--water'}>🐟</label>
                        <input
                            id={'dnd5CreatureForm--speed--water'}
                            onChange={e => this.props.changeWaterSpeed(e)}
                            type={'number'}
                            style={{maxWidth: '45px'}}
                            max={99}
                            value={this.props.speed.water}
                        />
                    </div>
                </div>
            </>
        )
    }
}