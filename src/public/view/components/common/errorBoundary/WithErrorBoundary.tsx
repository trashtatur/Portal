import * as React from 'react';
import {Component, ComponentType} from 'react';
import {ErrorBoundary} from "@/public/view/components/common/errorBoundary/ErrorBoundary";

function withErrorBoundary(): <P extends object>(WrappedComponent: ComponentType<P>) => void {
    return <P extends object>(WrappedComponent: ComponentType<P>) =>
        class WithErrorComponent extends Component<P> {
            public render() {
                return(
                    <ErrorBoundary>
                        <WrappedComponent {...this.props} />
                    </ErrorBoundary>
                )
            }
        }
}

export default withErrorBoundary;