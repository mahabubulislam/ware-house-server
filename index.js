const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion} = require('mongodb');
const  ObjectId = require('mongodb').ObjectId;
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
        // get data 
        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = await itemsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        // post data 
        app.post('/items', async (req, res) => {
            const newitems = req.body;
            const result = await itemsCollection.insertOne(newitems);
            res.send(result);
        })
        // delete data 
        app.delete('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await itemsCollection.deleteOne(query);
            res.send(result)
        })
        // update item 
        app.put('items/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};

        })
    }
    finally {

    }
}

run().catch(console.dir)




app.listen(port, () => {
    console.log('listening from', port)
})

