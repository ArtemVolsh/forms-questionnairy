const { Schema, model } = require("mongoose");

const QuestionOption = new Schema({
  optionRank: { type: Number, required: true },
  optionValue: { type: String, required: true },
});

const QuestionInput = new Schema({
  questionType: { type: String, required: true },
  questionOptions: [{ type: QuestionOption }],
});

const Question = new Schema({
  questionName: { type: String, required: true },
  questionRank: { type: Number, required: true },
  questionImage: { type: Buffer },
  questionId: { type: String, required: true },
  isQuestionMandatory: { type: Boolean, required: true },
  questionInput: { type: QuestionInput },
});

const FormsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    questions: [{ type: Question }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Forms", FormsSchema);

// const defaultForm = {
//   name: "",
//   description: "",
//   questions: [
//     {
//       questionName: "",
//       questionRank: 0,
//       questionImage: undefined,
//       isQuestionMandatory: false,
//       questionInput: {
//         questionType: questionTypes.TEXT,
//         questionOptions: [
//           {
//             optionRank: 0,
//             optionValue: "",
//           },
//         ],
//       },
//     },
//   ],
// };
