const mongoose = require('../utils/mongoose');
const constants = require('../utils/constants')

const MongooseSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
        autopopulate: {maxDepth: 1},
    },
    products: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'product',
        autopopulate: {maxDepth: 1},

    },
    count:{
        type: Number,
        default: 1,
    }
}, {timestamps: true}).plugin(require('mongoose-autopopulate'))

MongooseSchema.index({user: 1, products: 1}, {unique: true});


//
const SchemaModel = module.exports = mongoose.model('cart', MongooseSchema);

// C
module.exports.createData = (data, callback) => {
    if (SchemaModel(data).validateSync(data)) {
        callback(new SchemaModel(data).validateSync(data), null)
    } else {
        SchemaModel.create(data, callback);
    }

}

// Ra
module.exports.getAllData = (query, pageNumber, callback) => {
    SchemaModel
        .find(query)
        .limit(constants.paginate)
        .sort({createdAt: 'desc'})
        .skip(constants.paginate * (pageNumber))
        .exec().then(data =>
        callback(null, data)).catch(error =>
        callback(error, null));
}

// R1
module.exports.getOneData = (query, callback) => {
    SchemaModel.findOne(query)
        .exec()
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

// U1
module.exports.updateOneData = (query, data, callback) => {
    SchemaModel.findOneAndUpdate(query, data, {new: true}).exec((err, data) => {
        callback(err, data)
    })
}

// D1
module.exports.removeOneData = (query, callback) => {
    SchemaModel.remove(query, callback);
}

// Da
module.exports.removeAllData = (callback) => {
    SchemaModel.remove({
        status: {
            $ne: 'admin'
        }
    }, callback);
}