import { Component } from 'react';
import { C } from '../styles.js';
import { dispatchOpenFieldNotes } from '../gameData/hallPassEvents.js';
import { getErrorRingBuffer } from '../utils/errorRingBuffer.js';

export class GameErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    if (this.props.onError) this.props.onError(error, errorInfo);
  }

  render() {
    const { error, errorInfo } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={{ ...C.app, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ ...C.modal, maxWidth: 520, background: 'linear-gradient(160deg,#1a1018,#0d0810)', border: '1px solid #6a4050' }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: '#c9a060', marginBottom: 8 }}>📋 SHIFT LOG — INTERRUPTION</div>
          <p style={{ fontSize: 13, color: '#e8d8c8', lineHeight: 1.75, marginBottom: 12 }}>
            The semester hiccuped. Your residents are still there — but the scene caught, like a held breath.
            Your progress should still be saved locally.
          </p>
          <pre style={{ fontSize: 10, color: '#a08070', background: '#0a0608', padding: 10, borderRadius: 6, overflow: 'auto', maxHeight: 120, marginBottom: 12 }}>
            {error?.message || String(error)}
          </pre>
          {import.meta.env.DEV && errorInfo?.componentStack && (
            <pre style={{ fontSize: 9, color: '#706050', maxHeight: 80, overflow: 'auto', marginBottom: 12 }}>
              {errorInfo.componentStack}
            </pre>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button type="button" style={{ ...C.btn('#5a4030') }} onClick={() => dispatchOpenFieldNotes({ error })}>
              Log this issue
            </button>
            <button type="button" style={{ ...C.btn('#333') }} onClick={() => this.setState({ error: null, errorInfo: null })}>
              Try to continue
            </button>
            <button type="button" style={{ ...C.btn('#222'), fontSize: 11 }} onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
          {getErrorRingBuffer().length > 0 && (
            <div style={{ fontSize: 9, color: '#605040', marginTop: 10 }}>
              {getErrorRingBuffer().length} recent error(s) captured for export.
            </div>
          )}
        </div>
      </div>
    );
  }
}
