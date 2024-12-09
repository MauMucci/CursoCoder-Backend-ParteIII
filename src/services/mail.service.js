import nodemailer from 'nodemailer'
import { envConfig } from '../config/env.config.js'

export class MailService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host:envConfig.mailer.host,
            port:envConfig.mailer.port,
            auth:{
                user: envConfig.mailer.auth.user,
                pass: envConfig.mailer.auth.pass
            }
        })
        this.from = "maumucci91@gmail.com"
    }

    getMessageTemplate(type, mail) {
        let body = `<h1>Hola ${mail},</h1>`;
    
        switch (type) {
          case 'purchase':
            body += `
              <p>Gracias por tu compra en nuestra tienda.</p>
              <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            `;
            break;
    
    
          default:
            body += `<p>Gracias por tu mensaje.</p>`;
        }
    
        body += `
          <p>Saludos,</p>
          <p>Equipo de tu tienda</p>
        `;
    
        return body;
      }

    async sendMail({to,subject,type}) {

        try {
            const html = this.getMessageTemplate(type, to);

            const info = await this.transporter.sendMail({
              from: this.from,
              to,
              subject,
              html,
            });
            console.log('Email enviado:', info);
          } catch (error) {
            console.error('Error al enviar el email:', error);
          }
        }
    
}
