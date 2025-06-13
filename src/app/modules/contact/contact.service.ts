import AppError from "../../errors/AppError";
import { TContact } from "./contact.interface";
import { Contact } from "./contact.model";
import { HttpStatusCode } from 'axios';

export class ContactService {
   static async postContactIntoDB(payload: TContact) {
      const data = await Contact.create(payload);
      if (!data) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Failed to create contact',
            'Failed to create contact, please try again',
         );
      }
      return data;
   }

   static async getContactsFromDB() {
      const data = await Contact.find();
      if (!data) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Failed to get contacts',
            'Failed to get contacts, please try again',
         );
      }
      return data;
   }
}