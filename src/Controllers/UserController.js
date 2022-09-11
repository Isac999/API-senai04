const post = (req, res, next) => {
    res.status(201).send('Rota POST');
}

const put = (req, res, next) => {
    res.status(201).send('Rota PUT');
}

const del = (req, res, next) => {
    res.status(200).send('Rota DELETE');
}

const get = (req, res, next) => {
    res.status(200).send('Rota GET');
}

const getId = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID: ${id}`);
}

module.exports = {
    post, put, del, get, getId
}