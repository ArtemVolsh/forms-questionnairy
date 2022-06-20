const { Schema, model } = require("mongoose");

const AnswerItem = new Schema({
  answerQuestionRank: { type: Number, required: true },
  answerOptionRanks: [{ type: Number, required: true }],
  answerValue: { type: String, required: true },
  answerType: { type: String, required: true },
});

const Answer = new Schema({
  answersArray: [{ type: AnswerItem }],
  answersAuthor: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

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
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    formId: { type: String, required: true },
    questions: [{ type: Question }],
    answers: [{ type: Answer }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Forms", FormsSchema);
