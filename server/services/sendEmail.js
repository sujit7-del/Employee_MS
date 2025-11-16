import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const userEmail = process.env.EmsEmail;
const userEmailPass = process.env.EmsEmailPasS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userEmail,
        pass: userEmailPass,
    }
});

const sendEmail = async (mail) => {
    return await transporter.sendMail(mail);
}

export default sendEmail;