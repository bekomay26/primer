import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Wrapper, Spinner } from "./style";
import { AuthContext } from "../../app/AuthContext";

let loaderRoot = document.getElementById("overlay");
if (!loaderRoot) {
  loaderRoot = document.createElement("div");
  loaderRoot.setAttribute("id", "overlay");
  document.body.appendChild(loaderRoot);
}
const LoaderOverlay = () => {
  const { isAuthenticating } = useContext(AuthContext);
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const currentEl = elRef.current;
    loaderRoot.appendChild(currentEl);
    return () => loaderRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <Wrapper>
      <Spinner data-testid="spinner" />
      {isAuthenticating && <p>Logging in. Please wait...</p>}
    </Wrapper>,
    elRef.current
  );
};

export default LoaderOverlay;
