const FormsService = require("../service/forms-service");

class FormsController {
  createForm = async (req, res, next) => {
    try {
      const { form } = req.body;

      const formData = await FormsService.createForm(form);

      return res.json(formData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getUserForms = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const formData = await FormsService.getUserForms(userId);

      return res.json(formData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getFormById = async (req, res, next) => {
    try {
      const { formId } = req.body;

      const form = await FormsService.getFormById(formId)

      return res.json(form);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  addAnswers = async (req, res, next) => {
    try {
      const { answer, formId } = req.body;
      console.log(answer);
      const form = await FormsService.addAnswers(answer, formId);

      return res.json(form);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new FormsController();
