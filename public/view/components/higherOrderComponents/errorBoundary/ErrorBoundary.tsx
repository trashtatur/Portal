import * as React from 'react';
import {ReactElement, ReactNode} from 'react';

interface ErrorBoundaryProps {
    fallbackComponent?: ReactElement;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

const FallbackComponent = () => <div>An Error occured</div>;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {hasError: false}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({hasError: true})
        console.log('AN ERROR! OH NO!')
    }

    render(): ReactNode {
        if (!this.state.hasError) {
            return this.props.children
        }
        if (this.props.fallbackComponent) {
            return this.props.fallbackComponent;
        }
        return <FallbackComponent />
    }
}