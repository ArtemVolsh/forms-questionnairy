import { Add } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequest } from "../ApiRequests/apiRequests";

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const emailState = useSelector((state) => state.user.currentUser.email);
  const dispatch = useDispatch();

  return (
    <header className="header-wrapper">
      <div className="logo">
        <h3>Questionnairy Forms</h3>
      </div>
      <div className="navigation inline-flex">
        <nav className="inline-flex">
          <Link to="/">Forms</Link>
          <Link to="/app">Users</Link>

          {isAuth ? (
            <div className="inline-flex">
              <Typography
                sx={{
                  display: "inline-block",
                  padding: "0 10px 0 5px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                {emailState}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add color="white" sx={{ color: "white" }} />}
              >
                <Link className="form-card__link" to="/create">
                  Add Form
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  color: "black",
                  ml: 1,
                }}
                onClick={() => dispatch(logoutRequest())}
              >
                <Link style={{ color: "black", textDecoration: "none" }} to="/">
                  Log Out
                </Link>
              </Button>
            </div>
          ) : (
            <div style={{ display: "inline-block" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor: "white",
                  "&:hover": {
                    borderRight: 0,
                  },
                }}
              >
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  Log In
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  color: "black",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to="/registration"
                >
                  Sign In
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export { Header };
