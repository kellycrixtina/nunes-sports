import { db } from "../db.js";

export const getProducts = (_, res) => {
    const q = "SELECT * FROM products";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addProduct = (req, res) => {
    const q =
        "INSERT INTO products(`name`, `description`, `price`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto adicionado com sucesso.");
    });
};

export const updateProduct = (req, res) => {
    const q =
        "UPDATE products SET `nome` = ?, `email` = ?, `fone` = ? WHERE `id` = ?";

    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto atualizado com sucesso.");
    });
};

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM products WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto deletado com sucesso.");
    });
};