const { match } = require('assert');
const fs = require('fs')

let shoppingLists = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/data.json`)
);

exports.checkNameInBody = (req, res, next) => {
    const { name } = req.body;
    if (typeof name === 'string' && name.trim() !== '') {
        next();
    } else {
        res.status(400).json({
            status: "fail",
            message: "Name is required in the request body."
        });
    }
}

exports.checkIdExists = (req, res, next) => {
    const listId = Number(req.url.match(/\d+/g)[0]);
    const listExists = shoppingLists.some(list => list.id === listId);
    if (!listExists) {
        return res.status(404).json({
            status: "fail",
            message: "List with the provided ID not found"
        });
    }

    next();
}

exports.getList = async (req, res) => {
    try {
        const id = req.params.id
        const urlId = Number(id.match(/\d+/g));
        const list = shoppingLists.find(obj => obj.id === urlId)
        console.log(list)
        res.status(200).json({
            status: "success",
            data: list

        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred"
        });
    }
}

exports.getAllShoppingLists = (req, res) => {
    res.status(200).json({
        status: "success",
        results: shoppingLists.length,
        data: {
            shoppingLists
        }
    });
};

exports.createShoppingList = (req, res) => {
    try {
        const newId = shoppingLists.length * 1;
        const newShoppingList = Object.assign({id: newId}, req.body);
    
        shoppingLists.push(newShoppingList)
    
        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists), err => {
            res.status(201).json({
                status: "success",
                data: newShoppingList
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred"
        });
    }
};

exports.deleteShoppingList = (req, res) => {
    try {
        const urlId = req.params.id;
        const listToDelete = Number(urlId.match(/\d+/g));
        const newShoppingList = shoppingLists.filter(item => item.id !== Number(listToDelete));

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(newShoppingList), err => {
            res.status(202).json({
                statsu: "successfully deleted",
                data: null
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred"
        });
    }
};

exports.changeName = (req, res) => {
    try {
        const urlId = req.params.id;
        const listToRename = Number(urlId.match(/\d+/g));
        const newName = req.body.name;

        let isFound = false;
        shoppingLists.forEach(obj => {
            if (obj.id === listToRename) {
                obj.name = newName;
                isFound = true;
                console.log(obj)
            }
        });

        const filePath = `${__dirname}/../db/data.json`;
        fs.writeFile(filePath, JSON.stringify(shoppingLists, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: "error",
                    message: "Error writing file"
                });
            }

            res.status(200).json({
                status: "success",
                body: { name: newName }
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred"
        });
    }
};