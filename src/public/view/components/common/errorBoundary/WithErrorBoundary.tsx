import * as React from 'react';
import {Component, ComponentType, ReactNode} from 'react';
import {ErrorBoundary} from "@/public/view/components/common/errorBoundary/ErrorBoundary";

function withErrorBoundary(FallbackComponent?): (WrappedComponent: ComponentType) => void {
    return (WrappedComponent: ComponentType) =>
        class WithErrorBoundary extends Component{
             render(): ReactNode {
                return(
                    <ErrorBoundary fallbackComponent={FallbackComponent ?? <FallbackComponent />}>
                        <WrappedComponent {...this.props} />
                    </ErrorBoundary>
                )
            }
        }
}

export default withErrorBoundary;