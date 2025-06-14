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

   static async getContactsFromDB(slug: string) {
      const data = await Contact.find({ slug });
      if (!data || data.length === 0) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Failed to get contacts',
            'Failed to get contacts, please try again',
         );
      }
      return data;
   }

}