import * as React from 'react';
import {ReactNode} from 'react';
import {Modal} from "../../../common/modal/Modal";
import {DND5FormMenu} from "../formMenu/DND5FormMenu";
import * as style from './dnd5Menu.css';

export class DND5Menu extends React.Component {

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