const Categoria = require('./categorias');
const Producto = require('./productos');


Producto.belongsTo(Categoria, {foreignKey: "categoriaId" });

Categoria.hasMany(Producto);