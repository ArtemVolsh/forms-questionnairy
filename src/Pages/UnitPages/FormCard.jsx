import { Paper, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { List } from "@mui/icons-material";

export const FormCard = ({ form }) => {
  return (
    <Paper className="form-card" sx={{ height: "300px" }}>
      <Stack sx={{ height: "100%" }} justifyContent="space-between">
        <Typography className="text-overflow-1" fontWeight="bold" variant="h4">
          {form.name}
        </Typography>
        <Typography
          className="text-overflow"
          variant="body1"
          sx={{ justifySelf: "flex-start" }}
        >
          {form.description}
        </Typography>
        <Stack direction="row" gap={1}>
          <Typography
            sx={{ display: "inline-block" }}
            className="text-overflow"
          >
            Questions: {form.questions.length}
          </Typography>
          <Typography
            sx={{ display: "inline-block" }}
            className="text-overflow"
          >
            Answers: {form.questions.length}
          </Typography>
        </Stack>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="contained"
          startIcon={<List />}
        >
          <Link
            className="form-card__link"
            to={"/forms/specific/" + form.formId}
          >
            Details
          </Link>
        </Button>
      </Stack>
    </Paper>
  );
};
