import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  AddPhotoAlternate,
  ShortText,
  CheckBox,
  ArrowDropDownCircle,
} from "@mui/icons-material";

export const FormPage = () => {
  const questionTypes = {
    TEXT: "TEXT",
    SELECT: "SELECT",
    CHECKBOX: "CHECKBOX",
  };

  const defaultForm = {
    name: "",
    description: "",
    questions: [
      {
        questionName: "",
        questionRank: 0,
        questionImage: undefined,
        isQuestionMandatory: false,
        questionInput: {
          questionType: questionTypes.TEXT,
          questionOptions: [
            {
              optionRank: 0,
              optionValue: "",
            },
          ],
        },
      },
    ],
  };

  const defaultQuestions = [{}];

  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="page-wrapper">
      <Container sx={{ display: "flex" }} className="form-wrapper">
        <Paper className="form-name-wrapper">
          <Stack spacing={2}>
            <TextField
              name="name"
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              label="Form name"
              placeholder="Enter form name..."
              variant="filled"
            />
            <TextField
              name="description"
              onChange={handleChange}
              label="Form description"
              placeholder="Enter form description..."
              variant="filled"
              size="small"
            />
          </Stack>
        </Paper>
        <div className="form-questions-wrapper">
          {form.questions.map((q) => (
            <Paper key={q.questionName} className="form-question-wrapper">
              <Box sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    name="description"
                    onChange={handleChange}
                    label="Your question"
                    placeholder="Question text..."
                    variant="filled"
                    size="small"
                  />
                  <IconButton>
                    <AddPhotoAlternate />
                  </IconButton>
                  <Select value={q.questionInput.questionType} fullWidth>
                    <MenuItem value={questionTypes.TEXT}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ShortText /> <Typography>Text</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem value={questionTypes.SELECT}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ArrowDropDownCircle /> <Typography>Select</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem value={questionTypes.CHECKBOX}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CheckBox /> <Typography>Check Box</Typography>
                      </Stack>
                    </MenuItem>
                  </Select>
                </Stack>
              </Box>
            </Paper>
          ))}
        </div>
      </Container>
    </div>
  );
};
