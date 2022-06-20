import {
  Divider,
  Switch,
  Paper,
  Stack,
  Input,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import {
  ArrowDropDownCircle,
  RadioButtonChecked,
  AddPhotoAlternate,
  ShortText,
  CheckBox,
  Numbers,
  ContentCopy,
  DeleteForever,
} from "@mui/icons-material";

import { questionTypes } from "../Pages/UnitPages/FormPage";

import { FormInput } from "./FormInput";

export const Question = ({ stateHandlers, question }) => {
  const {
    handleQuestionChange,
    handleChangeQuestionInput,
    handleQuestionCopy,
    handleQuestionDelete,
    handleQuestionMandatory,
    handleOptionChange,
    handleAddOption,
    handleDeleteOption,
  } = stateHandlers;

  const optionStateHandlers = {
    handleOptionChange,
    handleAddOption,
    handleDeleteOption,
  };

  let { questionId, questionRank, questionInput } = question;
  let { questionType } = questionInput;

  return (
    <Paper key={"children" + questionId} className="form-question-wrapper">
      <Stack direction="row" spacing={1} alignItems="center" maxWidth="90%">
        <TextField
          name="questionName"
          onChange={(e) => handleQuestionChange(e, questionId)}
          sx={{ flexBasis: "30%" }}
          label="Your question"
          placeholder="Question text..."
          variant="filled"
          size="small"
        />

        <label htmlFor="question-upload-image">
          <Input
            name="questionImage"
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
          name="questionType"
          sx={{ flexBasis: "30%" }}
          value={questionType}
          fullWidth
          onChange={(e) => handleChangeQuestionInput(e, questionId)}
        >
          <MenuItem sx={{ padding: "15px" }} value={questionTypes.TEXT}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ShortText /> <Typography>Paragraph</Typography>
            </Stack>
          </MenuItem>

          <MenuItem sx={{ padding: "15px" }} value={questionTypes.SELECT}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowDropDownCircle /> <Typography>Dropdown</Typography>
            </Stack>
          </MenuItem>

          <MenuItem sx={{ padding: "15px" }} value={questionTypes.CHECKBOX}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckBox /> <Typography>Multiple choice</Typography>
            </Stack>
          </MenuItem>

          <MenuItem sx={{ padding: "15px" }} value={questionTypes.RADIO}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <RadioButtonChecked /> <Typography>Single choice</Typography>
            </Stack>
          </MenuItem>
        </Select>

        <Button
          sx={{ justifySelf: "flex-end" }}
          disabled
          startIcon={<Numbers />}
        >
          Question {questionRank + 1}
        </Button>
      </Stack>

      <FormInput
        type={question.questionInput.questionType}
        options={question.questionInput.questionOptions}
        questionId={questionId}
        stateHandlers={optionStateHandlers}
      />

      <Divider sx={{ margin: "25px 0 10px 0" }} />

      {/** BOTTOM TOOL PANEL */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        <IconButton onClick={(e) => handleQuestionCopy(e, question.questionId)}>
          <ContentCopy />
        </IconButton>
        {/** DELETE BUTTON */}
        <IconButton
          onClick={(e) => handleQuestionDelete(e, question.questionId)}
        >
          <DeleteForever />
        </IconButton>

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
            onChange={(e) => handleQuestionMandatory(e, question.questionId)}
          />
        </Typography>
      </Stack>
    </Paper>
  );
};
