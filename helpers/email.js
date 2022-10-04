const nodemailer = require('nodemailer');


const emailRegistro = async (datos) => {

    const { nombre, correo, token } = datos;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "61fd37b1f52fe3",
          pass: "92573637c874dc"
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

module.exports = {
    emailRegistro
}