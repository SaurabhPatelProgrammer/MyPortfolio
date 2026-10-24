import { lazy, Suspense, useCallback } from "react";
import "./styles/App.css";

const CharacterModel = lazy(() => import("./components/Character/Scene"));
import MainContainer from "./components/MainContainer";
import CharacterBoundary from "./components/Character/CharacterBoundary";
import { useLoading } from "./context/loadingContext";
import { LoadingProvider } from "./context/LoadingProvider";

const Portfolio = () => {
  const { setLoading } = useLoading();
  const showContent = useCallback(() => setLoading(100), [setLoading]);
  return <MainContainer>
    <CharacterBoundary onFailure={showContent}>
      <Suspense fallback={null}><CharacterModel /></Suspense>
    </CharacterBoundary>
  </MainContainer>;
};

const App = () => {
  return (
    <LoadingProvider>
      <Portfolio />
    </LoadingProvider>
  );
};

export default App;
