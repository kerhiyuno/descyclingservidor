const Categoria = require('../models/categorias');
const Producto = require('../models/productos');
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
        throw new Error(`El id de usuario ${id} no existe`);
    }
}

const categoriaExistePorId = async (id = '') => {
    const existe = await Categoria.findOne({ where: { id: id } });
    if (!existe) {
        throw new Error(`El id de categoria ${id} no existe`);
    }
}

const productoExistePorId = async (id = '') => {
    const existe = await Producto.findOne({ where: { id: id } });
    if (!existe) {
        throw new Error(`El id de producto ${id} no existe`);
    }
}

module.exports = {
    correoExiste,
    usuarioExistePorId,
    categoriaExistePorId,
    productoExistePorId
}