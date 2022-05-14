const connection = require ('./connectMysql');
const Producto = require ('../models/productos');
const Categoria = require ('../models/categorias');


exports.crearProducto = (req,res) => {
    console.log("desde crear producto");
}

exports.obtenerProductos  = async (req,res) => {
    try {
        const productos = await Producto.findAll({ include: [{
            model: Categoria,
            attributes:['nombre']
          },
        ],
    });
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
}