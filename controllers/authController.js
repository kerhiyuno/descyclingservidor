const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { json } = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const GoogleSignIn = async (req, res = response) => {

    const {id_token} = req.body;
    try {
        const { nombre, img, correo } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({where:{correo}})
        if(!usuario){
            const datos = {
                nombre,
                correo,
                img,
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
    }

}

const renovarToken = async( req, res = response ) =>{

    const { usuario } = req;

    // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    })
}

module.exports = {
    login,
    GoogleSignIn,
    renovarToken
}