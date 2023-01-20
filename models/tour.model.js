const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [3, "Name minimum 3 characters"],
        required: [true, "Tour name must be provided"],
        unique: true
    },
    type: {
        type: String,
        required: [true, "Type must be provided"],
        enum: {
            values: ["Independent", "Inclusive", "Business", "Escorted"],
            message: "{VALUE} is not a valid. Must be [Independent/Inclusive/Escorted/Business.]"
        }
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Tour location provided"],
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
        min: [10, "Minimum price must be 10"],
        validate: {
            validator: (value) => {
                const isinteger = Number.isInteger(value);
                if (isinteger) {
                    return true;
                } else {
                    return false;
                }
            },
            message: "Price must be a number"
        }
    },
    image: {
        type: String,
        required: [true, "Tour image must be provided"]
    },
    view: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
})

tourSchema.pre("save", function () {
    this.view = 0;
    console.log("Pre view: ", this.view);
})


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;