'use strict';
const fs = require('fs');

const deleteFiles = (req, res) => {
    const { name } = req.params;
    fs.unlinkSync('/root/Issste/isssteCGapi/files/' + name);
}

module.exports = {
    deleteFiles
}
