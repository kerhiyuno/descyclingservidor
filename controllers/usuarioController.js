const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {generarId} = require('../helpers/generarId.js')
const {emailRegistro,emailOlvidePassword} = require('../helpers/email');
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

    try {
        const { nombre, apellido, correo, password, rol } = req.body;
        const usuario = Usuario.build({ nombre, apellido, correo, password, rol });
        usuario.token = generarId();
        console.log(nombre, correo, password, rol);
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        // Guardar en BD
        await usuario.save();
        emailRegistro({
            nombre,
            correo,
            token: usuario.token
        })
        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
    }
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

const confirmar = async (req, res) => {

    const { token } = req.params;
    try {
        const usuarioConfirmar = await Usuario.findOne({ where: { token } });
        console.log(usuarioConfirmar);
        if (!usuarioConfirmar){
            return res.status(403).json({msg: "Token no valido"});
        }
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        return res.json({ msg: "Usuario confirmado"});
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {

    const { correo } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { correo }})
        if (!usuario){
            res.status(403).json({msg: "El usuario no existe"});
        }
        usuario.token = generarId();
        await usuario.save();
        emailOlvidePassword({
            nombre: usuario.nombre,
            correo: usuario.correo,
            token: usuario.token
        });
        res.json({ msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ where: { token }});
    if (tokenValido){
        res.json({ msg: "Token valido y el usuario existe"});
    } else {
        return res.status(404).json({
            msg: 'Token no válido'
        })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({ where: { token }});
    if (usuario){
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        usuario.token = '';
        await usuario.save();
        res.json({ msg: "Password modificada correctamente"});
    } else {
        return res.status(404).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    usuariosPut,
    usuariosPatch,
    borrarUsuario,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}