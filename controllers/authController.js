const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuarios');

const login = async (req, res = response) => {
    
    const { correo, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario){
            return res.status(400).json({
                msg: "El correo no está registrado"
            })
        }
        if (!usuario.estado){
            return res.status(400).json({
                msg: "El usuario fue borrado"
            })
        }

        const passwordvalida = bcryptjs.compareSync( password, usuario.password);

        if (!passwordvalida){
            return res.status(400).json({
                msg: "La contraseña no es válida"
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'login ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'Halgo salió mal'
        });
    }
}

module.exports = {
    login
}