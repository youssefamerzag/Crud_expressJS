const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/equipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const equipeSchema = new mongoose.Schema({
    id: String,
    name: String,
    username: String,
    email: String
});

const Equipe = mongoose.model('equipes', equipeSchema);

app.get('/equipes', async (req, res) => {
    const equipes = await Equipe.find({});
    res.status(200).json(equipes);
});

app.get('/equipes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const equipe = await Equipe.findOne({ id: id });
    return res.json(equipe);
});

app.delete('/equipes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const equipe = await Equipe.deleteOne({ id: id });
    res.json(equipe);
});

app.post('/equipes/create', async (req, res) => {
    const newEquipe = new Equipe(req.body);
    const savedEquipe = await newEquipe.save();
    res.status(201).json(savedEquipe);
});

app.put('/equipes/:id/update' , async (req , res) => {
    const id = parseInt(req.params.id);
    const { name , username , email} = req.body;
    const updatedeEquipe = await Equipe.findOneAndUpdate(
        { id : id },
        { $set : { name : name , usename : username , email : email } },
        { new : true }
    );
    res.json(updatedeEquipe)
})