import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: null | string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, errorInfo: _.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>ErrorBoundary:</h1>
          <h4>{this.state.errorInfo}</h4>
          <button onClick={() => window.location.reload()}>Reload</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
