import { Container } from "@mui/material";
import { FormPage } from "./UnitPages/FormPage";

const MainPage = () => {
  return (
    <div className="page-wrapper">
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "24px 0",
        }}
      >
        <h1 style={{ marginBottom: "15px" }}>Forms</h1>
        <FormPage />
      </Container>
    </div>
  );
};

export { MainPage };
