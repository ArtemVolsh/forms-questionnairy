import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Stack,
  Typography,
  Container,
  Button,
  Modal,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AnswerInput } from "./AnswerInput";
import { questionTypes } from "../Pages/UnitPages/FormPage";
import { Send, Close, Done } from "@mui/icons-material";
import { addAnswers } from "../ApiRequests/apiRequests";

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

export const Answer = () => {
  const user = useSelector((state) => state.user.currentUser.email);
  const id = useSelector((state) => state.user.currentUser.id);

  const { formId } = useParams();

  const defaultForm = {
    name: "",
    user: id,
    description: "",
    formId: "0000-aaaa-000-aaa",
    questions: [
      {
        questionName: "",
        questionRank: 0,
        questionImage: null,
        questionId: "0000-aaaa-000-aaa",
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
    answers: [],
  };

  const [form, setForm] = useState(defaultForm);
  const [answers, setAnswers] = useState([]);

  const defaultAnswer = {
    answersAuthor: id,
    answersArray: answers,
  };

  const [answer, setAnswer] = useState(defaultAnswer);

  const [saveModal, setSaveModal] = useState(false);
  const [mandatoryModal, setMandatoryModal] = useState(false);
  // console.log(form);

  // Handlers
  const handleValidation = (e) => {
    let prevArr = [...form.questions];
    let mandatoryQuestions = prevArr.filter((item) => item.isQuestionMandatory);
    let mandatoryRanks = mandatoryQuestions.map((item) => item.questionRank);

    let isValid = true;

    if (answers.length === 0 && mandatoryRanks.length !== 0) {
      isValid = false;
      return isValid;
    }

    for (let rank of mandatoryRanks) {
      let checkAnswer = answers.findIndex(
        (item) => item.answerQuestionRank === rank
      );
      if (checkAnswer < 0) isValid = false;
    }

    return isValid;
  };

  handleValidation();

  const handleAnswerAddition = (answer) => {
    const idx = answers.findIndex(
      (ans) => ans.answerQuestionRank === answer.answerQuestionRank
    );
    if (idx > -1) {
      answers[idx] = answer;
    } else {
      answers.push(answer);
    }
  };

  const handleAnswerDelete = (rank) => {
    const idx = answers.findIndex((item) => item.answerQuestionRank === rank);

    setAnswers((prev) =>
      prev.filter((item, index) => {
        return index !== idx;
      })
    );
  };

  const answerHandlers = {
    handleAnswerAddition,
    handleAnswerDelete,
  };

  useEffect(() => {
    setAnswer((prev) => ({ ...prev, answersArray: answers }));
  }, [answers]);

  console.log(answer);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/forms/specific`, {
        formId,
      })
      .then((response) => setForm(response.data.form));
  }, [formId]);

  return (
    <div className="page-wrapper">
      <Container sx={{ mt: 1, display: "flex" }} className="form-wrapper">
        <Paper className="form-name-wrapper">
          <Stack spacing={2}>
            <Typography fontWeight="bold" variant="h5">
              {form.name}
            </Typography>
            <Typography variant="body1">{form.description}</Typography>
          </Stack>
        </Paper>
        <div className="form-questions-wrapper">
          <Button
            variant="contained"
            onClick={() => {
              console.log(answers);
              console.log(answer);
            }}
          >
            Log
          </Button>
          {form.questions?.map((question) => (
            <Paper
              key={"anwser-" + question.questionId}
              className="form-question-wrapper"
            >
              <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
                {question.questionName}
                {question.isQuestionMandatory ? (
                  <Button sx={{ ml: 2 }} variant="outlined" color="error">
                    MANDATORY
                  </Button>
                ) : (
                  <></>
                )}
              </Typography>
              <AnswerInput
                question={question}
                type={question.questionInput.questionType}
                stateHandlers={answerHandlers}
              />
            </Paper>
          ))}
        </div>
        <Button
          onClick={() => {
            if (handleValidation()) {
              setSaveModal(true);
            } else {
              setMandatoryModal(true);
            }
          }}
          variant="contained"
          endIcon={<Send />}
        >
          Save and send
        </Button>
        <Modal open={saveModal} onClose={() => setSaveModal(false)}>
          <Stack sx={styledModal} gap={1}>
            <Typography textAlign="center">
              Are you sure you want to save current answer? <br />
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
                  addAnswers(answer, formId);
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
        <Modal open={mandatoryModal} onClose={() => setMandatoryModal(false)}>
          <Stack sx={styledModal}>
            <Typography textAlign="center">
              <Button color="error">Fill the mandatory fields</Button>
            </Typography>
          </Stack>
        </Modal>
      </Container>
    </div>
  );
};
