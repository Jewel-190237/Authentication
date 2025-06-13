import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactService } from "./contact.service";
import { HttpStatusCode } from 'axios';

export class ContactController {
   static createContact = catchAsync(async (req, res) => {
      const { body } = req.body;
      await ContactService.postContactIntoDB(body);
      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Contact created successfully',
         data: null
      })
   })

   static getContacts = catchAsync(async (req, res) => {
      const data = await ContactService.getContactsFromDB();
      sendResponse(res, {
         statusCode: HttpStatusCode.Ok,
         success: true,
         message: 'Contacts fetched successfully',
         data: data
      })
   })
}