const mongoose = require('../utils/mongoose');
const constants = require('../utils/constants')

const MongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
        autopopulate: {maxDepth: 1}
    },
    category: {
        type: String,
        enum: ['saree', 'ornaments','food','clothing' ],
        required: true
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: 'shop',
    },

    type: {
        type: String,
        enum: ['Resell', 'New'],
        default: 'New',
    },
    picture:{
        type: String,
        required: true,
    },
    pAvailable: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ['Available', 'Out of Order'],
        default: 'Out of Order'

    }
}, {timestamps: true}).plugin(require('mongoose-autopopulate'))

//
const SchemaModel = module.exports = mongoose.model('product', MongooseSchema);

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