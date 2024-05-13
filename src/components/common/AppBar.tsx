import {
  useTheme,
  useMediaQuery,
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  Container,
} from "@mui/material";
import { Luggage, StoreMallDirectory, AttachMoney } from "@mui/icons-material";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import userProfilePic from "../../assets/userProfilePic.jpg";

function AppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const isActive = (path: string) => router.pathname.includes(path);

  return (
    <MuiAppBar
      position="static"
      sx={{
        width: isMobile ? "100%" : "15%",
        maxWidth: isMobile ? "none" : "115px",
        minHeight: isMobile ? "auto" : "100vh",
        flexDirection: isMobile ? "row" : "column",
        backgroundColor: "#93BFCF",
        alignItems: isMobile ? "center" : "stretch",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          height: "100%",
          alignItems: isMobile ? "center" : "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Avatar>
            <Image
              src={userProfilePic}
              alt="ProfilePicture"
              width={50}
              height={50}
            />
          </Avatar>
        </Box>

        <Toolbar
          sx={{
            flexDirection: isMobile ? "row" : "column",
            flexGrow: 2,
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 3 : 15,
          }}
        >
          <Tooltip title="Inventory">
            <IconButton>
              <Luggage fontSize="large" />
            </IconButton>
          </Tooltip>
          {!isActive("/distributors") && (
            <Tooltip title="Distributors">
              <Link href="/distributors" passHref>
                <IconButton>
                  <StoreMallDirectory fontSize="large" />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {!isActive("/invoices") && (
            <Tooltip title="Invoices">
              <Link href="/invoices" passHref>
                <IconButton>
                  <AttachMoney fontSize="large" />
                </IconButton>
              </Link>
            </Tooltip>
          )}
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexGrow: 0,
            mb: isMobile ? 0 : 3,
            alignItems: "center",
          }}
        >
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Box>
      </Container>
    </MuiAppBar>
  );
}

export default AppBar;
