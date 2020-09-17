import express from 'express';
import mongoose, { connect } from 'mongoose';

const app = express();
app.use(express.json());

const Product = mongoose.model('Product', {
    name: { type: String, require: true},
    price: { type: Number, require: true},
});

const Catergory = mongoose.model('Category', {
    name: { type: String, require: true },  
    description: { type: String, require: true},
});

    app.get('/api/categories', async (req, res) => {
        const categories = await Catergory.find();
        res.send(categories);
    });

    app.get('/api/categories/:id', async (req, res) => {
        const categories = await Catergory.findById(req.params.id);
        res.send(categories);
    });

    app.post('/api/categories', async (req, res) => {
        const { name, description } = req.body;
        const category = new Catergory({name, description});
        const result = await category.save();
        res.send(result);
    });

    app.put('api/categories/:id', async (req, res) => {
        const body = {
            name: req.body.name,
            description: req.body.description,
        };
        const category = await Catergory.findByIdAndUpdate(req.params.id, body, {
            new: true,
        });
        res.send(category);
    });

    app.delete('/api/categories/:id', async (req, res) => {
        const result = await Catergory.findByIdAndDelete(req.params.id);
        res.send(result);
    });

    app.get('/api/products', async (req, res) => {
        const products = await Product.find();
        res.send(products);
    });

    app.get('/api/products/:id', async (req, res) => {
        const products = await Product.findById(req.params.id);
        res.send(products);
    });

    app.post('/api/products', async (req, res) => {
        const { name, price} = req.body;
        const product = new Product({name, price});
        const result = await product.save();
        res.send(result);
    });

    app.put('/api/products/:id', async (req, res) => {
        const body = {
            name: req.body.name,
            price: req.body.price,
        };
        const product = await Product.findByIdAndUpdate(req.params.id, body, {
            new: true,
        });
        res.send(product);
    });

    app.delete('/api/products/:id', async (req, res) => {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.send(result);
    });

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/lazadaDB', {
            useNewUrlParser: true,
        });
        console.log('connected to mongoDB...');
    } catch (error) {
        console.log('could not connect to mongoDB...');
    }
};
connectToDB();

app.listen(3001, () => console.log(`Listening to Port 3001`));