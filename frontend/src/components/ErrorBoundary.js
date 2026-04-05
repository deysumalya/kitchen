import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error marking a white screen crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#900', color: '#fff', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Something went wrong.</h1>
          <p style={{ fontSize: '18px', maxWidth: '800px', textAlign: 'center' }}>
            We encountered an unexpected application crash. Please send this exact text back to the assistant:
          </p>
          <pre style={{ 
            background: '#000', 
            padding: '20px', 
            borderRadius: '10px', 
            marginTop: '20px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            width: '90%',
            maxWidth: '1000px',
            textAlign: 'left',
            overflowX: 'auto',
            fontSize: '14px'
          }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
