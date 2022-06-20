import { questionTypes } from "../Pages/UnitPages/FormPage";
import {
  Checkbox,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import { useEffect, useState } from "react";

export const AnswerInput = ({ type, stateHandlers, question }) => {
  const defaultAnswer = {
    answerQuestionRank: question.questionRank,
    answerOptionRank: [],
    answerValue: "",
    answerType: null,
  };

  const { handleAnswerAddition, handleAnswerDelete } = stateHandlers;

  const [answer, setAnswer] = useState(defaultAnswer);

  const handleSelectAnswerChange = (e, selected) => {
    const { value, rank, atype } = selected.props;

    let prevArr = [...answer.answerOptionRank];
    let newElem = rank;

    if (prevArr.length === 0) {
      prevArr.push(newElem);
    } else if (prevArr.length !== 0) {
      prevArr.splice(0, prevArr.length); // cleaning array, only one selected value in Select type
      prevArr.push(newElem);
    }

    setAnswer((prev) => {
      return {
        ...prev,
        answerValue: value,
        answerOptionRank: prevArr,
        answerType: atype,
      };
    });
  };

  const handleTextAnswerChange = (e) => {
    const { value } = e.target;

    setAnswer((prev) => ({
      ...prev,
      answerQuestionRank: question.questionRank,
      answerValue: value,
      answerOptionRank: [0],
      answerType: questionTypes.TEXT,
    }));
  };

  const handleCheckAnswerChange = (e, rank) => {
    const { checked, value } = e.target;

    let prevArr = [...answer.answerOptionRank];
    let newElem = rank;

    if (!prevArr.includes(newElem)) {
      prevArr.push(newElem);

      setAnswer((prev) => {
        return {
          ...prev,
          answerValue: value,
          answerOptionRank: prevArr,
          answerType: questionTypes.CHECKBOX,
        };
      });
    } else if (prevArr.includes(newElem)) {
      let idx = prevArr.indexOf(newElem);
      prevArr.splice(idx, 1);

      setAnswer((prev) => {
        return {
          ...prev,
          answerValue: value,
          answerOptionRank: prevArr,
          answerType: questionTypes.CHECKBOX,
        };
      });

      if (prevArr.length === 0) {
        handleAnswerDelete(question.questionRank);
      } else {
        setAnswer((prev) => {
          return {
            ...prev,
            answerValue: value,
            answerOptionRank: prevArr,
            answerType: questionTypes.CHECKBOX,
          };
        });
      }
    }
  };

  const handleRadioAnswerChange = (e, item) => {
    const idx = question.questionInput.questionOptions.findIndex(
      (op) => op.optionValue === item
    );
    const rank = question.questionInput.questionOptions[idx].optionRank;

    let prevArr = [...answer.answerOptionRank];
    let newElem = rank;

    if (prevArr.length === 0) {
      prevArr.push(newElem);
    } else {
      prevArr.splice(0, prevArr.length); // cleaning array, only one selected value in Radio type
      prevArr.push(newElem);
    }

    setAnswer((prev) => {
      return {
        ...prev,
        answerValue: item,
        answerOptionRank: prevArr,
        answerType: questionTypes.RADIO,
      };
    });
  };

  useEffect(() => {
    for (let [key, value] of Object.entries(answer)) {
      if (value === null) return;
    }

    handleAnswerAddition(answer);
  }, [answer]);

  switch (type) {
    case questionTypes.TEXT:
      return (
        <TextField
          placeholder="Enter your answer..."
          onChange={handleTextAnswerChange}
        />
      );

    case questionTypes.SELECT:
      return (
        <FormControl fullWidth>
          <InputLabel id="answer-select-label">Select...</InputLabel>
          <Select
            variant="standard"
            sx={{ maxWidth: "30%" }}
            value={answer.answerValue}
            labelId="answer-select-label"
            onChange={(e, selected) => handleSelectAnswerChange(e, selected)}
          >
            <MenuItem disabled>
              <em>Select...</em>
            </MenuItem>
            {question.questionInput.questionOptions.map((op) => (
              <MenuItem
                key={"menu-item-" + op.optionValue}
                rank={op.optionRank}
                atype={questionTypes.SELECT}
                value={op.optionValue}
              >
                {op.optionValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case questionTypes.CHECKBOX:
      return (
        <FormControl component="fieldset">
          <FormLabel>Pick one or multiple...</FormLabel>
          <FormGroup>
            {question.questionInput.questionOptions.map((op) => (
              <FormControlLabel
                key={"checkbox-" + op.optionValue + op.optionRank}
                control={
                  <Checkbox
                    checked={answer.answerOptionRank.includes(op.optionRank)}
                    value={op.optionValue}
                    onChange={(e) => handleCheckAnswerChange(e, op.optionRank)}
                  />
                }
                label={op.optionValue}
              />
            ))}
          </FormGroup>
        </FormControl>
      );

    case questionTypes.RADIO:
      return (
        <FormControl>
          <FormLabel>Pick one...</FormLabel>
          <RadioGroup
            value={answer.answerValue}
            onChange={(e, item) => handleRadioAnswerChange(e, item)}
          >
            {question.questionInput.questionOptions.map((op) => (
              <FormControlLabel
                key={"radio-" + op.optionValue + op.optionRank}
                control={<Radio />}
                value={op.optionValue}
                label={op.optionValue}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
  }
};
