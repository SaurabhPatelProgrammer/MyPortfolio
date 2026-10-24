import { useEffect } from "react";
import "../../styles/Loading.css";
import { useLoading } from "../../context/loadingContext";
import Logo from "./Logo";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const ready = percent >= 100;
  useEffect(() => {
    if (!ready) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [ready, setIsLoading]);
  return <div className={"loading-screen" + (ready ? " loading-exit" : "")} role="status" aria-live="polite">
    <Logo className="loader-logo" />
    <p>{ready ? "Welcome" : "Preparing the 3D experience…"}</p>
    <span className="loading-progress" aria-hidden="true" />
  </div>;
};
export default Loading;
