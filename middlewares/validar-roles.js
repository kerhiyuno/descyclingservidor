const { response,request } = require("express")


const esAdmin = (req = request,res = response) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }

    const { rol, nombre } =  req.usuario;
    if( rol !== 'admin'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador`
        });
    }
}

const tieneRol = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }


        next();
    }
}

module.exports = {
    esAdmin,
    tieneRol
}