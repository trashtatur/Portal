import * as React from 'react';
import {ReactNode} from 'react';
import {Modal} from "../../../common/modal/Modal";
import {DND5FormMenu} from "../formMenu/DND5FormMenu";
import * as style from './dnd5Menu.css';

interface DND5MenuProps {

}

interface DND5MenuState {

}

export class DND5Menu extends React.Component<DND5MenuProps, DND5MenuState> {

    render(): ReactNode {
        return (
            <div className={style.menuContainer}>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'+'}>
                    <DND5FormMenu type={'create'} />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'🖉'}>
                    <DND5FormMenu type={'edit'} />
                </Modal>
                <Modal triggerButtonClassName={style.menuButton} triggerButtonContent={'⇑'}>
                </Modal>
            </div>
        )
    }
}