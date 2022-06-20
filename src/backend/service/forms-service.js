const FormsModel = require("../models/forms-model");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");

class FormsService {
  createForm = async (form) => {
    const candidate = await FormsModel.findOne({ formId: form.formId });
    if (candidate) {
      throw ApiError.BadRequest(`Form is already exist: ${form.formId} `);
    }

    const createdForm = await FormsModel.create(form).then(async (result) => {
      const formAuthor = await UserModel.findOneAndUpdate(
        { _id: result.user },
        { $push: { forms: result._id } }
      );
      return result;
    });

    return { createdForm };
  };

  getUserForms = async (userId) => {
    const user = await UserModel.findById(userId).populate("forms");

    return user.forms;
  };

  getFormById = async (formId) => {
    const form = await FormsModel.findOne({ formId }).populate({
      path: "answers",
      populate: { path: "answersAuthor" },
    });

    return { form };
  };

  addAnswers = async (answer, formId) => {
    const form = await FormsModel.updateOne(
      { formId },
      { $push: { answers: answer } }
    );

    return { form };
  };
}

module.exports = new FormsService();
