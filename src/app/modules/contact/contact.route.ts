import { Router } from "express";
import validate from "../../middleware/validate";
import { ContactValidation } from "./contact.validation";
import { ContactController } from "./contact.controller";

const router = Router();

router.post(
   '/contact',
   validate(ContactValidation.postValidationSchema),
   ContactController.createContact
);