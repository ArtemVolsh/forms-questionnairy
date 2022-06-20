import { useState } from "react";
import { v4 as genId } from "uuid";

import {
  Paper,
  Stack,
  TextField,
  Box,
  Button,
  Container,
  Modal,
  Typography,
} from "@mui/material";

import { createForm } from "../../ApiRequests/apiRequests";

import { Question } from "../../Components/Question";
import { Close, Done, Send } from "@mui/icons-material";
import { useSelector } from "react-redux";

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
  // States
  const id = useSelector((state) => state.user.currentUser.id);

  const defaultForm = {
    name: "",
    user: id,
    description: "",
    formId: genId(),
    questions: [
      {
        questionName: "",
        questionRank: 0,
        questionImage: null,
        questionId: genId(),
        isQuestionMandatory: false,
        questionInput: {
          questionType: questionTypes.SELECT,
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

  const [form, setForm] = useState(defaultForm);
  const [deleteModal, setDeleteModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  // States end

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // Question Handlers
  const handleQuestionChange = (e, id) => {
    const { name, value } = e.target;
    const idx = form.questions.findIndex((item) => item.questionId === id);

    let prevArr = [...form.questions];
    let prevItem = { ...form.questions[idx] };
    prevItem[name] = value;
    prevArr[idx] = prevItem;

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleChangeQuestionInput = (e, id) => {
    const { value } = e.target;
    const idx = form.questions.findIndex((item) => item.questionId === id);

    let prevArr = [...form.questions];
    let prevItem = { ...form.questions[idx] };
    prevItem.questionInput.questionType = value;
    prevArr[idx] = prevItem;

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleQuestionMandatory = (e, id) => {
    const idx = form.questions.findIndex((item) => item.questionId === id);

    let prevArr = [...form.questions];
    let prevQuestion = prevArr[idx];

    prevQuestion.isQuestionMandatory = !prevQuestion.isQuestionMandatory;

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleQuestionCopy = (e, id) => {
    const idx = form.questions.findIndex((item) => item.questionId === id);

    let prevArr = [...form.questions];
    let newItem = JSON.parse(JSON.stringify(form.questions[idx])); // deep copy
    newItem.questionId = genId();

    prevArr.splice(idx + 1, 0, newItem);

    for (let [i, item] of prevArr.entries()) {
      item.questionRank = i;
    }

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleQuestionDelete = (e, id) => {
    if (form.questions.length === 1) {
      setDeleteModal(true);
      e.target.color = "error";
    } else {
      const idx = form.questions.findIndex((item) => item.questionId === id);

      let prevArr = [...form.questions];

      prevArr.splice(idx, 1);

      for (let [i, item] of prevArr.entries()) {
        item.questionRank = i;
      }

      setForm((prev) => ({ ...prev, questions: prevArr }));
    }
  };
  // Option Handlers
  const handleOptionChange = (e, id, rank) => {
    const { name, value } = e.target;
    const idx = form.questions.findIndex((item) => item.questionId === id);
    const jdx = form.questions[idx].questionInput.questionOptions.findIndex(
      (item) => item.optionRank === rank
    );
    let prevArr = [...form.questions];
    let prevQ = prevArr[idx];
    let prevOpt = prevQ.questionInput.questionOptions[jdx];

    prevOpt[name] = value;

    prevArr[idx] = prevQ;

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleAddOption = (e, id, rank) => {
    const idx = form.questions.findIndex((item) => item.questionId === id);
    const jdx = form.questions[idx].questionInput.questionOptions.findIndex(
      (item) => item.optionRank === rank
    );

    let prevArr = [...form.questions];
    let prevQ = prevArr[idx];
    let prevOptions = prevQ.questionInput.questionOptions;

    let newOption = {
      optionRank: jdx + 1,
      optionValue: "",
    };

    prevOptions.splice(jdx + 1, 0, newOption);

    for (let [i, item] of prevQ.questionInput.questionOptions.entries()) {
      item.optionRank = i;
    }

    setForm((prev) => ({ ...prev, questions: prevArr }));
  };

  const handleDeleteOption = (e, id, rank) => {
    const idx = form.questions.findIndex((item) => item.questionId === id);
    const jdx = form.questions[idx].questionInput.questionOptions.findIndex(
      (item) => item.optionRank === rank
    );

    if (form.questions[idx].questionInput.questionOptions.length === 1) {
      setDeleteModal(true);
      e.target.color = "error";
    } else {
      let prevArr = [...form.questions];
      let prevQ = prevArr[idx];
      let prevOptions = prevQ.questionInput.questionOptions;

      prevOptions.splice(jdx, 1);

      for (let [i, item] of prevQ.questionInput.questionOptions.entries()) {
        item.optionRank = i;
      }

      setForm((prev) => ({ ...prev, questions: prevArr }));
    }
  };

  const stateHandlers = {
    handleQuestionChange,
    handleChangeQuestionInput,
    handleQuestionCopy,
    handleQuestionDelete,
    handleQuestionMandatory,
    handleOptionChange,
    handleAddOption,
    handleDeleteOption,
  };
  // Handlers end
  const formValidation = (form) => {};

  // log("FORM LOG");
  // log(form);

  return (
    <div className="page-wrapper">
      <Container sx={{ display: "flex" }} className="form-wrapper">
        <Paper sx={{ maxWidth: "fit-content" }}>
          <Button
            endIcon={<Send />}
            onClick={() => {
              setSaveModal(true);
            }}
          >
            Save
          </Button>
          <Modal open={saveModal} onClose={() => setSaveModal(false)}>
            <Stack sx={styledModal} gap={1}>
              <Typography textAlign="center">
                Are you sure you want to save current form? <br />
                <strong>
                  <i>Changes would be unavailable</i>
                </strong>
              </Typography>
              <Stack direction="row" gap={1}>
                <Button
                  onClick={() => setSaveModal(false)}
                  variant="outlined"
                  color="error"
                  startIcon={<Close />}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    createForm(form);
                    setSaveModal(false);
                  }}
                  variant="outlined"
                  color="success"
                  startIcon={<Done />}
                >
                  Yes
                </Button>
              </Stack>
            </Stack>
          </Modal>
        </Paper>
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
          <Button
            variant="contained"
            onClick={() => console.log(JSON.stringify(form, null, 2))}
          >
            Log Button
          </Button>

          {form.questions.map((question) => (
            <Question
              key={"question" + question.questionId}
              stateHandlers={stateHandlers}
              question={question}
            />
          ))}
          {/** DELETE MODAL */}
          <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
            <Box sx={styledModal}>
              <Button
                onClick={() => setDeleteModal(false)}
                variant="outlined"
                color="error"
              >
                You cant delete last element!
              </Button>
            </Box>
          </Modal>
          {/** DELETE MODAL END */}
        </div>
      </Container>
    </div>
  );
};
