const { response } = require('express');
const Producto = require ('../models/productos');
const Categoria = require ('../models/categorias');


const crearProducto = async (req,res) => {
    const { nombre, descripcion, stock, precio, imagen, categoriaId } = req.body;

    try {
        const productoDb = await Producto.findOne({where:{nombre} });
        if (productoDb){
            console.log(productoDb);
            return res.status(400).json({
                msg: `El producto ${nombre} ya existe`
            })
        }
            
        const producto =  Producto.build({ nombre, descripcion, stock, precio, imagen, categoriaId });
        await producto.save();
        res.status(201).json({
            producto
        });
    } catch (error) {
        console.log(error);
    }

}

const obtenerProductos  = async (req,res) => {
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

const obtenerProductoPorId = async (req,res) => {
    const { id } = req.params;
    try {
        console.log("A");
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            })
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
}
const productosPut = async (req,res) => {
    const { id } = req.params;
    const { estado, ...data } = req.body;

    const actualizacion = await Producto.update( data , {
        where: {
          id
        },
      });
    const productoactualizado = await Producto.findByPk(id);
    res.json(productoactualizado);
}

const borrarProducto = async(req, res = response) => {
    const { id } = req.params;
    try {
        const borrado = await Producto.update({ estado: false }, {
            where: {
              id: id
            }
          });
        const ProductoEliminado = await Producto.findByPk(id);
        res.json({ProductoEliminado});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    productosPut,
    borrarProducto
}