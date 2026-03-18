
  import React from "react";
  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";

  class GlobalErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: any) {
      return { hasError: true, error };
    }
    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: 20, color: 'red', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            <h1>Something went wrong.</h1>
            <pre>{this.state.error?.toString()}</pre>
            <pre>{this.state.error?.stack}</pre>
          </div>
        );
      }
      return this.props.children;
    }
  }

  createRoot(document.getElementById("root")!).render(
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  );