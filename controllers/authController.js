const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { json } = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const jwt = require('jsonwebtoken');
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

        if (!usuario.confirmado){
            return res.status(400).json({
                msg: "Tu cuenta no ha sido confirmada"
            })
        }

        const passwordvalida = bcryptjs.compareSync( password, usuario.password);

        if (!passwordvalida){
            return res.status(400).json({
                msg: "La contraseña no es válida"
            })
        }

        const accessToken = await generarJWT(usuario.id, 'access');
        const refreshToken = await generarJWT(usuario.id, 'refresh');
        usuario.refreshToken = refreshToken;
        usuario.save();
        res.json({
            msg: 'login ok',
            usuario,
            nombre: usuario.nombre,
            accessToken,
            refreshToken,
            google: false
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'Algo salió mal'
        });
    }
}

const GoogleSignIn = async (req, res = response) => {

    const {id_token} = req.body;
    try {
        const { nombre, apellido, img, correo } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({where:{correo}})
        if(!usuario){
            const datos = {
                nombre,
                correo,
                img,
                apellido,
                password: ':D',
                rol: 'usuario',
                google: true
            };
            usuario = Usuario.build(datos);
            await usuario.save();
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        console.log(error);
    }

}

const renovarToken = async( req, res = response ) =>{

    const { usuario } = req;

    // Generar el JWT
    const accessToken = await generarJWT( usuario.id, 'access');

    res.json({
        usuario,
        accessToken
    })
}

const refreshToken = async (req = request , res = response) => {
    
    const refreshToken = req.header('x-token');
    
    if(!refreshToken){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(refreshToken,process.env.REFRESHRPRIVATEKEY);
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
        const accessToken = await generarJWT( usuarioAutenticado.id, 'access');
        return res.status(200).json({
            accessToken
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token incorrecto'
        })
    }
}

module.exports = {
    login,
    GoogleSignIn,
    renovarToken,
    refreshToken
}