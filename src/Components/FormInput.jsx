import { TextField, Stack, Typography, IconButton } from "@mui/material";

import { Add, DeleteForever } from "@mui/icons-material";
import { questionTypes } from "../Pages/UnitPages/FormPage";

export const FormInput = ({ type, options, questionId, stateHandlers }) => {
  const { handleOptionChange, handleAddOption, handleDeleteOption } =
    stateHandlers;

  const compareRanks = (a, b) => {
    if (a.optionRank > b.optionRank) return 1;
    if (a.optionRank < b.optionRank) return -1;
    if (a.optionRank === b.optionRank) return 0;
  };

  switch (type) {
    case questionTypes.TEXT:
      return <TextField disabled placeholder="Answer here..." />;

    case questionTypes.SELECT:
      return (
        <Stack>
          {options.sort(compareRanks).map((option) => (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              key={"option" + option.optionRank}
            >
              <Typography sx={{ alignSelf: "flex-end" }}>
                {option.optionRank + 1}.
              </Typography>
              <TextField
                name="optionValue"
                sx={{ maxWidth: "30%" }}
                variant="standard"
                value={option.optionValue}
                onChange={(e) =>
                  handleOptionChange(e, questionId, option.optionRank)
                }
              />
              <IconButton
                onClick={(e) =>
                  handleAddOption(e, questionId, option.optionRank)
                }
              >
                <Add />
              </IconButton>
              <IconButton
                onClick={(e) =>
                  handleDeleteOption(e, questionId, option.optionRank)
                }
              >
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      );

    case questionTypes.CHECKBOX:
      return (
        <Stack>
          {options.sort(compareRanks).map((option) => (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              key={"option" + option.optionRank}
            >
              <Typography sx={{ alignSelf: "flex-end" }}>
                {option.optionRank + 1}.
              </Typography>
              <TextField
                name="optionValue"
                sx={{ maxWidth: "30%" }}
                variant="standard"
                value={option.optionValue}
                onChange={(e) =>
                  handleOptionChange(e, questionId, option.optionRank)
                }
              />
              <IconButton
                onClick={(e) =>
                  handleAddOption(e, questionId, option.optionRank)
                }
              >
                <Add />
              </IconButton>
              <IconButton
                onClick={(e) =>
                  handleDeleteOption(e, questionId, option.optionRank)
                }
              >
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      );

    case questionTypes.RADIO:
      return (
        <Stack>
          {options.sort(compareRanks).map((option) => (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              key={"option" + option.optionRank}
            >
              <Typography sx={{ alignSelf: "flex-end" }}>
                {option.optionRank + 1}.
              </Typography>
              <TextField
                name="optionValue"
                sx={{ maxWidth: "30%" }}
                variant="standard"
                value={option.optionValue}
                onChange={(e) =>
                  handleOptionChange(e, questionId, option.optionRank)
                }
              />
              <IconButton
                onClick={(e) =>
                  handleAddOption(e, questionId, option.optionRank)
                }
              >
                <Add />
              </IconButton>
              <IconButton
                onClick={(e) =>
                  handleDeleteOption(e, questionId, option.optionRank)
                }
              >
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      );

    default:
      return <div>Error occurred 😭</div>;
  }
};
