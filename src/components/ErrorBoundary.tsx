import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "4rem", color: "#ff4444", background: "#111", height: "100vh", zIndex: 999999, position: "relative", fontFamily: "monospace", overflow: "auto" }}>
          <h1 style={{fontSize:"2rem", marginBottom:"1rem"}}>Utopia Max: CRITICAL RENDER CRASH</h1>
          <p style={{fontSize:"1.2rem", marginBottom:"2rem"}}>A React component threw an exception during the render phase.</p>
          <pre style={{background:"#222", padding:"1rem", borderRadius:"8px", marginBottom:"1rem"}}>{this.state.error?.toString()}</pre>
          <pre style={{background:"#222", padding:"1rem", borderRadius:"8px", whiteSpace: "pre-wrap"}}>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
