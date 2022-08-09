const mongoose=require("mongoose")
const { Schema } = mongoose;

// Type of floor - Required
// Space - Required
// Per Sqft - Required
// Total Price - Required
// Floor image - Required

var floorplanschema = new Schema({
    floortype: {
        type: String,
        required: true,
        maxlength: 64
    },
    carpetarea: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    pricepersqft: {
        type: Number,
        required: true,
        maxlength: 64,
        trim: true
    },
    totalprice: {
        type: Number,
        required: true,
        maxlength: 64,
        trim: true
    },
    // CONSIDERING ADDING IMAGE FOR FLOOR IS COMPULSORY
    
    floorimage: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
})


module.exports = mongoose.model("Floorplan", floorplanschema);


//------NO USE------
// floorimage: {
    //     data: Buffer,
    //     contentType: String,
    //     required: true
    // },