import React from "react";

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const AppError = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <h1>
        Oops!, This wasn't suppose to happen, click
        <button type="button" onClick={onClick}>
          here
        </button>{" "}
        to go back to the home page
      </h1>
    </div>
  );
};

export default ErrorBoundary;
