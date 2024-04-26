import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={`flex flex-grow ${isMobile ? "flex-col" : "flex-row"}`}>
      {children}
    </div>
  );
};

export default AppContainer;