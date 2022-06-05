import { Select, TextField, Checkbox, Radio } from "@mui/material";
import { questionTypes } from "../Pages/UnitPages/FormPage";

export const FormInput = ({ type, options, handler }) => {
  switch (type) {
    case questionTypes.TEXT:
      return <TextField disabled placeholder="Answer here..." />;

    case questionTypes.SELECT:
      return <Select />;

    case questionTypes.CHECKBOX:
      return <Checkbox />;

    case questionTypes.RADIO:
      return <Radio />;

    default:
      return <div>Error occurreds 😭</div>;
  }
};
