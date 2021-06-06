import * as React from 'react';
import {ReactNode} from 'react';
import {createPortal} from "react-dom";
import * as style from './modal.component.less'

const modalRoot = document.getElementById('modalRoot');

interface ModalProps {
    triggerButtonClassName: string;
    triggerButtonContent: string;
}

interface ModalState {
    modalOpen: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    modalElement = document.createElement('div')

    componentDidMount(): void {
        this.modalElement.style.zIndex = '1'
        modalRoot.appendChild(this.modalElement)
    }

    componentWillUnmount(): void {
        modalRoot.removeChild(this.modalElement)
    }

    toggleModal = (): void => {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    render(): ReactNode {
        const modalContent = (
            <div className={style.modalBackground}>
                <div className={style.modalBase}>
                    <div className={style.headerBar}>
                        <button
                            onClick={() => this.toggleModal()}
                            className={style.modalCloseButton}
                        >X</button>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
        return (
            <>
                <button
                    className={this.props.triggerButtonClassName}
                    onClick={()=> this.toggleModal()}
                >
                    {this.props.triggerButtonContent}
                </button>
                {
                    this.state.modalOpen &&
                    createPortal(modalContent, this.modalElement)
                }
            </>
        )
    }
}