'use strict';
const fs = require('fs');

const deleteFiles = (req, res) => {
    const { name } = req.params;
    fs.unlinkSync('157.245.12.180:5000/' + name);
}

module.exports = {
    deleteFiles
}