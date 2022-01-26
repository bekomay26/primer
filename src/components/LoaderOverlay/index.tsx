import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Wrapper, Spinner } from "./style";

let loaderRoot = document.getElementById("overlay");
if (!loaderRoot) {
  loaderRoot = document.createElement("div");
  loaderRoot.setAttribute("id", "overlay");
  document.body.appendChild(loaderRoot);
}
const LoaderOverlay = () => {
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
    </Wrapper>,
    elRef.current
  );
};

export default LoaderOverlay;
