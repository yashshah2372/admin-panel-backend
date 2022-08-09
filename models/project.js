const mongoose=require("mongoose")


const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;


var projectschema = new Schema({
    // Project Info -    
    projectname: {
        type: String,
        requied: true,
        maxlength: 156,
        trim: true
    },
    projectlocation: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projectlocality: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projectcity: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projectstate: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projecttype: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projectsubtype: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projectconfiguration: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    projecttowerunit: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    
   // 11. Project Area - Required
    projectarea: {
        type: Number,
        // requied: true,
        maxlength: 156,
        trim: true
    },
    // 12. Facing -Required
    projectfacing: {
        type: String,
        // requied: true,
        maxlength: 64,
        trim: true
    },
    // 13. Furnishing - Optional
    projectfurnishing: {
        type: String,
        maxlength: 64,
        trim: true
    },
    // 14. RERA Number - Required

    projectreranumber: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
//15. Project Min & Max Space - Required

    projectminspace: {
        type: Number,
        // requied: true,
        maxlength: 64,
        trim: true
    },
    projectmaxspace: {
        type: Number,
        // requied: true,
        maxlength: 64,
        trim: true
    },
// 16. Project Min/Max Price - Required
    projectminprice: {
        type: Number,
        // requied: true,
        maxlength: 64,
        trim: true
    },

    projectmaxprice: {
        type: Number,
        // requied: true,
        maxlength: 64,
        trim: true
    },
// 18. Images (All folder) - Required apart from other
    
    projectpossessionstatus: {
        type: String,
        // requied: true,
        maxlength: 156,
        trim: true
    },
// 19. About Project - Required

    aboutproject: {
        type: String,
        // requied: true,
        maxlength: 2048,
        trim: true
    },
//20. Specifiction - Optional

    projectspecification: {
        type: String,
        // requied: true,
        maxlength: 2048,
        trim: true
    },

//Floor Plan Detail -
//-------------------------------------
// commenting for now
    floorplan:  
       [ {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Floorplan",
    }
],
    
    

    // floorplan: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "Floorplan"
    // },
        // required: true,
        // default: undefined,
        // type: [{
            // floortype: {
            //     type: String,
            //     required: true,
            //     maxlength: 64
            // },
            // carpetarea: {
            //     type: Number,
            //     required: true,
            //     maxlength: 32,
            //     trim: true
            // },
            // pricepersqft: {
            //     type: Number,
            //     required: true,
            //     maxlength: 64,
            //     trim: true
            // },
            // totalprice: {
            //     type: Number,
            //     required: true,
            //     maxlength: 64,
            //     trim: true
            // },
            // floorimage: {
            //     id: {
            //         type: String,
            //         required: true
            //     },
            //     secure_url: {
            //         type: String,
            //         required: true
            //     }
            // },
        // }],

        //required: true,
        //req will contain array of object
        //floor plan will contain images 
    

    //---------------------------
// Locality Details -
// Country - Required

// Project Longitude - Required
// Project Latitude - Required

    country: {
        type: String,
        // required: true,
        maxlength: 64
    },
// // City/District - Required
// //but city is already a field
    projectlongitude: {
        type: String,
        // required: true,
        maxlength: 64
    },

    projectlatitude: {
        type: String,
        // required: true,
        maxlength: 64
    },
    

// // Amenities -
// // Basic Amenities - Required
// // Convenience Amenities - Required
// // Environment Amenities - Required
// // Security Amenities - Required
// // Sports Amenities - Required
    basicamenities: {
        type: [String],
        // requied: true,
        maxlength: 156,
        trim: true
    },
    convenienceamenities: {
        type: [String],
        // requied: true,
        maxlength: 156,
        trim: true
    },
    environmentamenities: {
        type: [String],
        // requied: true,
        maxlength: 156,
        trim: true
    },
    securityamenities: {
        type: [String],
        // requied: true,
        maxlength: 156,
        trim: true
    },
    sportsamenities: {
        type: [String],
        // requied: true,
        maxlength: 156,
        trim: true
    },

    externalimages: [
        {
            id: {
                type: String,
                // required: true
            },
            secure_url: {
                type: String,
                // required: true
            }
        }
    ],
    internalimages: [
        {
            id: {
                type: String,
                // required: true
            },
            secure_url: {
                type: String,
                // required: true
            }
        }
    ],
    amenitiesimages: [
        {
            id: {
                type: String,
                // required: true
            },
            secure_url: {
                type: String,
                // required: true
            }
        }
    ],
    othersimages: [
        {
            id: {
                type: String,
                // required: true
            },
            secure_url: {
                type: String,
                // required: true
            }
        }
    ],


// // Builder Profile -
// // Image - Required
// // Name - Required
// // Address - Required
// // Locality - Required
// // Year of est. - Required
// // Project - Required
// // Types of company - optional
// // Contact no - Required
// // website - optional
// // email add - Required
// // Description - Optional
    buildername: {
            type: String,
            // required: true,
            maxlength: 32
        },
    builderimage: {
        id: {
            type: String,
            required: false
        },
        secure_url: {
            type: String,
            // required: true
        }
    },
    builderaddress: {
        type: String,
        // required: true,
        maxlength: 256
    },
    builderlocality: {
        type: String,
        // required: true,
        maxlength: 16 
    },
    builderyoe: {
        type: Number,
        // required: true,
        maxlength: 4
    },
    builderproject: {
        type: String,
        // required: true,
        maxlength: 64
    },
    companytype: {
        type: String,
        maxlength: 256
    },
    buildercontact: {
        type: Number,
        maxlength: 32,
        // required: true
    },
    builderwebsite: {
        type: String,
        maxlength: 32,
        // required: true
    },
    builderemail: {
        type: String,
        maxlength: 32,
        // required: true
    },
    builderdescription: {
        type: String,
        maxlength: 2048,
        // required: true
    },


// Project Legal Detail -
// OC - Required
// CC - Required
// Khata no - Required
// Khata Type - Required
// Rera Approved - Required
// RERA Approved authority name - Required

    ocimage: {
        id: {
            type: String,
            // required: true
        },
        secure_url: {
            type: String,
            // required: true
        }
    },
    ccimage: {
        id: {
            type: String,
            // required: true
        },
        secure_url: {
            type: String,
            // required: true
        }
    },
    khatano: {
        type: Number,
        maxlength: 32,
        // required: true
    },
    khatatype: {
        type: String,
        maxlength: 32,
        // required: true
    },
    reraapproved: {
    required: true,
    type: Boolean,
    default: false
    },
    reraauthority: {
        type: String,
        // required: true,
        maxlength: 100
    },

},{timestamps: true}
);

module.exports = mongoose.model("Project", projectschema);