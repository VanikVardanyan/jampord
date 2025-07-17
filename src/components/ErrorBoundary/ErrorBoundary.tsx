import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // TODO: log error and errorInfo
    this.setState({ hasError: true });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          <button onClick={this.handleRefresh} type='button'>
            REFRESH
          </button>
        </div>
      );
    }

    return children;
  }
}
