import nodemailer from 'nodemailer';
import { convert } from 'html-to-text';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Email {
  constructor(){}

  transport(){
    return  nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // sendPasswordResetEmail
  sendPasswordResetEmail(info){
    const password_reset_email_html_template = renderHtmlTemplate('server/utils/email/passwordReset.html', info);
    return this.transport().sendMail({
      to: info.email,
      from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: 'Your password reset token (valid for 10 minutes)',
      html: password_reset_email_html_template,
      text: convert(password_reset_email_html_template)
    })
  }

  confirm_newsletterSub(info){
    const confirm_newsletterSub_email_html_template = renderHtmlTemplate('server/utils/emailTemplates/newsletter/confirmSub.html', info);
    return this.transport().sendMail({
      to: info.email,
      form: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: 'destaAlcohol&Liquor newsletter confirmaition',
      html: confirm_newsletterSub_email_html_template,
      text: convert(confirm_newsletterSub_email_html_template)
    })
  }

  // here work for the newsletter app's feature
  sendNewsletter(info){
    const newsletter_email_html_template = renderHtmlTemplate('server/utils/emailTemplates/newsletter/newsletter.html', info);

    return this.transport().sendMail({
      to: info.email,
      form: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: info.subject,
      html: newsletter_email_html_template,
      text: convert(newsletter_email_html_template)
    })
  }

// Contact us
contactus(info, files = []) {
  return this.transport().sendMail({
    to: process.env.SMTP_GM,
    from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
    subject: `CONTACT US MESSAGE FROM 'destaalcohol.et' WEBSITE : ${info.subject}`,
    text: `
      New Contact Us Message:

      Name: ${info.name}
      Email: ${info.email}
      Phone: ${info.phoneNumber}
      Subject: ${info.subject}
      Message: ${info.message}
    `,
    html: `
      <h3>New Contact Us Message</h3>
      <p><strong>Name:</strong> ${info.name}</p>
      <p><strong>Email:</strong> ${info.email}</p>
      <p><strong>Phone:</strong> ${info.phoneNumber}</p>
      <p><strong>Subject:</strong> ${info.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${info.message}</p>
    `,
  });
}


  order(info, files = []) {
    return this.transport().sendMail({
      to: process.env.SMTP_GM,
      from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: `Customer Order mail from 'destaalcohol.et' WEBSITE`,
      text: `
        New Customer Order:

        Order Area: ${info.orderArea}
        Full Name: ${info.fullName}
        Email: ${info.email}
        Phone: ${info.phoneNumber}
        Country: ${info.country}
        Product: ${info.product}
      `,
      html: `
        <h3>New Customer Order</h3>
        <p><strong>Full Name:</strong> ${info.fullName}</p>
        <p><strong>Email:</strong> ${info.email}</p>
        <p><strong>Phone:</strong> ${info.phoneNumber}</p>
        <p><strong>Country:</strong> ${info.country}</p>
        <p><strong>Product:</strong> ${info.product}</p>
        <p><strong>Order Area:</strong> ${info.orderArea}</p>
      `,
      attachments: files.map(file => ({
        filename: file.filename,
        content: file.buffer
      }))
    });
  }
}



// since we are using pure html template for send htmlmail use the function below to render and replace the {{  }} using the info obj
function renderHtmlTemplate(filePath, info) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Template file not found: ${absolutePath}`);
    }

    let htmlContent = fs.readFileSync(absolutePath, 'utf8');
    htmlContent = htmlContent.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      return info[key.trim()] ?? match;
    });

    return htmlContent;
  } catch (error) {
    console.error('Error processing the HTML template:', error);
    return `<p>Error loading email template</p>`;
  }
}

