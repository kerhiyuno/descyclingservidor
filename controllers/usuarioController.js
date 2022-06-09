const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');



const obtenerUsuarios = async(req = request, res = response) => {
    
    const usuarios = await Usuario.findAll({  
        attributes:['nombre','correo','rol'],
        where: {
            estado: true
        }
    });

    res.json({
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {
    
    const { nombre, apellido, correo, password, rol } = req.body;
    const usuario = Usuario.build({ nombre, apellido, correo, password, rol });
    console.log(nombre, correo, password, rol);
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const actualizacion = await Usuario.update( resto, {
        where: {
          id
        },
      });
    const usuarioactualizado = await Usuario.findByPk(id);
    res.json(usuarioactualizado);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const borrarUsuario = async(req, res = response) => {

    const { id } = req.params;

    const borrado = await Usuario.update({ estado: false }, {
        where: {
          id: id
        }
      });
    const usuarioEliminado = await Usuario.findByPk(id);
    res.json({usuarioEliminado});
}




module.exports = {
    obtenerUsuarios,
    crearUsuario,
    usuariosPut,
    usuariosPatch,
    borrarUsuario,
}