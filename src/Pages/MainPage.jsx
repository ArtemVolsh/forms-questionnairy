import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { FormPage } from "./UnitPages/FormPage";
import axios from "axios";
import { FormCard } from "./UnitPages/FormCard";

const MainPage = () => {
  const userId = useSelector((state) => state.user.currentUser.id);
  const userEmail = useSelector((state) => state.user.currentUser.email);

  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(`http://localhost:5000/api/forms/user`, { userId })
        .then((response) => {
          console.log(response);
          setUserForms(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    <div className="page-wrapper">
      <Container
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "24px 0",
        }}
      >
        <h1 style={{ marginBottom: "15px" }}>Forms from {userEmail}</h1>
        <Grid
          sx={{ display: "flex", gap: "10px", justifyContent: "center" }}
          container
        >
          {userForms.map((form) => (
            <Grid key={`form-${form.formId}`} item xs={6} md={3}>
              <FormCard form={form} />
            </Grid>
          ))}
        </Grid>
        {/* <FormPage /> */}
      </Container>
    </div>
  );
};

export { MainPage };
