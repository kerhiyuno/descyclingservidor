const Usuario = require('../models/usuarios');

//Verificar su el correo existe
const correoExiste =  async ( correo = '') => {
    const existe = await Usuario.findOne({ where: { correo: correo } });
    if (existe) {
        console.log("ya existe");
        console.log(existe);
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const usuarioExistePorId =  async ( id = '') => {
    const existe = await Usuario.findOne({ where: { id: id } });
    console.log(existe);
    console.log(!existe);
    if (!existe) {
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    correoExiste,
    usuarioExistePorId
}