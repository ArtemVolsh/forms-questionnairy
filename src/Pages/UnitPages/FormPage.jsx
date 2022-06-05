import { useEffect, useState } from "react";
import { v4 as genId } from "uuid";

import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  Container,
  Divider,
  Switch,
  Input,
  Modal,
} from "@mui/material";
import {
  AddPhotoAlternate,
  ShortText,
  CheckBox,
  ArrowDropDownCircle,
  RadioButtonChecked,
  ContentCopy,
  DeleteForever,
  Numbers,
} from "@mui/icons-material";

import { FormInput } from "../../Components/FormInput";
import { combineReducers } from "redux";

export const questionTypes = {
  TEXT: "TEXT",
  SELECT: "SELECT",
  CHECKBOX: "CHECKBOX",
  RADIO: "RADIO",
};

const styledModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "whitesmoke",
  borderRadius: "5px",
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

export const FormPage = () => {
  const defaultForm = {
    name: "",
    description: "",
    questions: [
      {
        questionName: "",
        questionRank: 0,
        questionImage: undefined,
        questionId: `${genId()}`,
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

  const [deleteModal, setDeleteModal] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  console.log(form);

  const handleInputType = (e, Id) => {
    const { value } = e.target;
    const idx = form.questions.findIndex((item) => item.questionId === Id);

    setForm((prevState) => {
      prevState.questions[idx].questionInput.questionType = value;
      return { ...prevState };
    });
  };

  const handleInputMandatory = (e, Id) => {
    const { checked } = e.target;
    const idx = form.questions.findIndex((item) => item.questionId === Id);

    setForm((prevState) => {
      prevState.questions[idx].isQuestionMandatory = checked;
      return { ...prevState };
    });
  };

  const handleInputCopy = (e, Id) => {
    setForm((prevState) => {
      const idx = form.questions.findIndex((item) => item.questionId === Id);

      const newQuestion = prevState.questions[idx];
      const questionCopy = {
        ...newQuestion,
        questionId: genId(),
        questionRank: newQuestion.questionRank + 1,
      };

      prevState.questions.splice(idx + 1, 0, questionCopy);

      for (let [i, item] of prevState.questions.entries()) {
        item.questionRank = i;
      }

      return { ...prevState };
    });
  };

  const handleInputDelete = (e, Id) => {
    if (form.questions.length === 1) {
      setDeleteModal(true);
      e.target.color = "error";
    } else {
      setForm((prevState) => {
        const idx = form.questions.findIndex((item) => item.questionId === Id);

        prevState.questions.splice(idx, 1);

        for (let [i, item] of prevState.questions.entries()) {
          item.questionRank = i;
        }

        return { ...prevState };
      });
      e.target.color = "inherit";
    }
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
          {form.questions.map((question) => (
            <Paper
              key={question.questionId}
              sx={{ marginBottom: "15px" }}
              className="form-question-wrapper"
            >
              {/** TOP TOOL PANEL */}

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                maxWidth="90%"
              >
                <TextField
                  name="description"
                  sx={{ flexBasis: "30%" }}
                  onChange={handleChange}
                  label="Your question"
                  placeholder="Question text..."
                  variant="filled"
                  size="small"
                />
                <label htmlFor="question-upload-image">
                  <Input
                    sx={{ display: "none" }}
                    accept="image/*"
                    id="question-upload-image"
                    type="file"
                  />
                  <IconButton component="span">
                    <AddPhotoAlternate />
                  </IconButton>
                </label>
                <Select
                  name="question.questionInput.questionType"
                  value={question.questionInput.questionType}
                  sx={{ flexBasis: "30%" }}
                  fullWidth
                  onChange={(e) => handleInputType(e, question.questionId)}
                >
                  <MenuItem sx={{ padding: "15px" }} value={questionTypes.TEXT}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ShortText /> <Typography>Paragraph</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    sx={{ padding: "15px" }}
                    value={questionTypes.SELECT}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ArrowDropDownCircle /> <Typography>Dropdown</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    sx={{ padding: "15px" }}
                    value={questionTypes.CHECKBOX}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckBox /> <Typography>Single choice</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    sx={{ padding: "15px" }}
                    value={questionTypes.RADIO}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <RadioButtonChecked />{" "}
                      <Typography>Multiple choice</Typography>
                    </Stack>
                  </MenuItem>
                </Select>
                <Button disabled startIcon={<Numbers />}>
                  Question {question.questionRank}
                </Button>
              </Stack>
              {/** TOP TOOL PANEL END */}

              {/** IMAGE */}
              {question.questionImage === undefined ? (
                <Box>
                  <img src="" alt="" />
                </Box>
              ) : (
                <></>
              )}
              {/** IMAGE END */}

              <FormInput
                type={question.questionInput.questionType}
                options={question.questionInput.questionOptions}
              />

              <Divider sx={{ margin: "25px 0 10px 0" }} />

              {/** BOTTOM TOOL PANEL */}

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <IconButton
                  onClick={(e) => handleInputCopy(e, question.questionId)}
                >
                  <ContentCopy />
                </IconButton>
                {/** DELETE BUTTON */}
                <IconButton
                  onClick={(e) => handleInputDelete(e, question.questionId)}
                >
                  <DeleteForever />
                </IconButton>
                {/** DELETE MODAL */}
                <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
                  <Box sx={styledModal}>
                    <Button
                      onClick={() => setDeleteModal(false)}
                      variant="outlined"
                      color="error"
                    >
                      You cant delete last question!
                    </Button>
                  </Box>
                </Modal>
                {/** DELETE MODAL END */}

                <Divider
                  sx={{
                    padding: "10px 0",
                    background: "rgba(0, 0, 0, 0.27)",
                  }}
                  orientation="vertical"
                />
                <Typography>
                  Mandatory
                  <Switch
                    checked={question.isQuestionMandatory}
                    onChange={(e) =>
                      handleInputMandatory(e, question.questionId)
                    }
                  />
                </Typography>
              </Stack>

              {/** BOTTOM TOOL PANEL END*/}
            </Paper>
          ))}
        </div>
      </Container>
    </div>
  );
};
