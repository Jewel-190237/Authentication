import nodemailer from 'nodemailer';
export type TData = {
   email: string;
   subject: string;
   message: string;
}

export const sendUserEmail = async (data: TData) => {
   let transporter;
   transporter = nodemailer.createTransport({
      secure: false,
      service: 'gmail',
      auth: {
         user: '190237@ku.ac.bd',
         pass: 'fyxf cztp nxur kyve',
      },
   });

   return await transporter.sendMail({
      from: 'jewel190237@gmail.com', // sender address
      to: data.email, // list of receivers
      subject: data.subject, // Subject line
      html: data.message, // html body
   })
}
