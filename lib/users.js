var generateSafeId = require('generate-safe-id');
var safeId = generateSafeId();
var shortid = require('shortid');
const users = {};

function randomID(){
    id = shortid();
    return id;
}

exports.create = async(socket) => {
    const id = randomID();
    users[id] = socket;
    return id;
};

exports.get = (id) => users[id];

exports.remove = (id) => delete users[id];