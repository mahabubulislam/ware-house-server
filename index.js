const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mzq8m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db('ware-house').collection('items');
        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = await itemsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })


    }
    finally {

    }
}

run().catch(console.dir)




app.listen(port, () => {
    console.log('listening from', port)
})

