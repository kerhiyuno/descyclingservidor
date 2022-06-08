const Categoria = require ('../models/categorias');


const crearCategoria  = async (req,res) => {
    const { nombre } = req.body;

    try {
        const categoriaDb = await Categoria.findOne({where:{nombre} });
        if (categoriaDb){
            console.log(categoriaDb);
            return res.status(400).json({
                msg: `La categoria ${nombre} ya existe`
            })
        }
            
        const categoria =  Categoria.build({ nombre });
        await categoria.save();
        res.status(201).json({
            categoria
        });
    } catch (error) {
        console.log(error);
    }

}

const obtenerCategorias  = async (req,res) => {
    try {
        const categoria = await Categoria.findAll();
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
}

const obtenerCategoriaPorId  = async (req,res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
}

const categoriasPut = async (req,res) => {
    const { id } = req.params;
    const { estado, ...data } = req.body;

    const actualizacion = await Categoria.update( data , {
        where: {
          id
        },
      });
    const categoriaactualizada = await Categoria.findByPk(id);
    res.json(categoriaactualizada);
}

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;

    const borrado = await Categoria.update({ estado: false }, {
        where: {
          id: id
        }
      });
    const CategoriaEliminada = await Categoria.findByPk(id);
    res.json({CategoriaEliminada});
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    categoriasPut,
    borrarCategoria
}