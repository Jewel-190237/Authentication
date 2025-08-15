export const generateOTP = (length: number) => {
   const digits: string = '0123456789';
   let OTP: string = ''
   for (let i = 1; i < length; i++) {
      OTP += digits.charAt(Math.floor(Math.random() * digits.length));
   }
   return OTP;
}