const { response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async (req = request , res = response, next) => {
    
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuarioAutenticado = await Usuario.findByPk(uid);
        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: "Token no válido - usuario no existe en bd"
            })
        }
        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: "Token no válido - usuario estado false"
            })
        }
        req.usuario = usuarioAutenticado;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token incorrecto'
        })
    }
}

module.exports = {
    validarJWT
}