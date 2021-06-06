import * as React from 'react';
import {Component, ComponentType} from 'react';
import {ErrorBoundary} from "./ErrorBoundary";

function withErrorBoundary(FallbackComponent=null): <P extends object>(WrappedComponent: ComponentType<P>) => void {
    return <P extends object>(WrappedComponent: ComponentType<P>) =>
        class WithErrorBoundary extends Component<P> {
            public render() {
                if (FallbackComponent) {
                    return (
                        <ErrorBoundary fallbackComponent={FallbackComponent}>
                            <WrappedComponent {...this.props} />
                        </ErrorBoundary>
                    )
                }
                return(
                    <ErrorBoundary>
                        <WrappedComponent {...this.props} />
                    </ErrorBoundary>
                )
            }
        }
}

export default withErrorBoundary;