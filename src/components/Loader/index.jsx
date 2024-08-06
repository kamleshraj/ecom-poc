import { RotateLoader } from "react-spinners";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f6f9fc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <RotateLoader
        color="#0f3460"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </LoaderWrapper>
  );
};
