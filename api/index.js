const express = require('express');
const app = express();
const cors = require('cors');
const fs = require("fs");
const datos = require('../product.json');
const path = require('path');

app.use(cors());
app.use(express.static('public'));


app.get('/datos', (req, res) => {
    res.json(datos); 
});


app.get("/dom", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dom/listado.html'));
});

app.get("/cliente_servidor", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cliente_servidor/listado.html'));
});

const path = require('path');

app.get('/express', (req, res) => {
    fs.readFile('./product.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error del servidor al leer los datos');
            return;
        }

        const productos = JSON.parse(data);
        let productosHTML = '';

        productos.forEach(producto => {
            productosHTML += `
                <div class="elemento">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                </div>
            `;
        });

        fs.readFile(path.join(__dirname, '../public/express/listado.html'), 'utf8', (err, html) => {
            if (err) {
                console.error("Error al leer el archivo listado.html:", err);
                res.status(500).send("Error interno del servidor");
                return;
            }

            const modifiedHTML = html.replace("<!-- PRODUCTOS -->", productosHTML);

            res.send(modifiedHTML);
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;