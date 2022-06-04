import { Container } from "@mui/material";

const MainPage = () => {
  return (
    <div className="page-wrapper">
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "24px 0",
        }}
      >
        <h1 style={{ marginBottom: "15px" }}>Forms</h1>
      </Container>
    </div>
  );
};

export { MainPage };
