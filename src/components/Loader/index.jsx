import { RotateLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="loaderWrapper">
      <RotateLoader
        color="#0f3460"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
