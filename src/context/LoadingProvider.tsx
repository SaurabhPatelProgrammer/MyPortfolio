import { PropsWithChildren, useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import { LoadingContext } from "./loadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    document.body.style.overflowY = isLoading ? "hidden" : "auto";
    if (!isLoading) return;
    // Optional 3D assets must never block access to the portfolio indefinitely.
    const timeout = window.setTimeout(() => setLoading(100), 3000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const value = { isLoading, setIsLoading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
