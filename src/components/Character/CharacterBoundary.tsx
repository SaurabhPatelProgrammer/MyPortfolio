import { Component, type ErrorInfo, type ReactNode } from "react";

class CharacterBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("3D view unavailable; showing the portfolio without it.", error, info.componentStack);
    this.props.onFailure();
  }
  render() { return this.state.failed ? null : this.props.children; }
}
export default CharacterBoundary;
