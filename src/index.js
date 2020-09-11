import express from 'express';

const app = express();
app.use(express.json());
app.listen(3001, () => console.log(`Listening to Port 3001`));

app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'iphone X',
        },
    ];
    res.send(products);
});