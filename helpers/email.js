const nodemailer = require('nodemailer');


const emailRegistro = async (datos) => {

    const { nombre, correo, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

     try {
        const info = await transport.sendMail({
            from: "reciclaje",
            to: correo,
            subject: "Reciclaje - Comprueba tu cuenta",
            text: "Comprueba tu cuenta en reciclaje",
            html: `<p>hola: ${nombre} comprueba tu cuenta en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            `
        });  
     } catch (error) {
        console.log(error);
     }

}

const emailOlvidePassword = async (datos) => {

    const { nombre, correo, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

     try {
        const info = await transport.sendMail({
            from: "reciclaje",
            to: correo,
            subject: "Reciclaje - Cambia tu contraseña",
            text: "Cambia tu contraseña",
            html: `<p>hola: ${nombre} Cambia tu contraseña en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/nueva-password/${token}">Cambiar contraseña</a>
            `
        });  
     } catch (error) {
        console.log(error);
     }

}

module.exports = {
    emailRegistro,
    emailOlvidePassword
}