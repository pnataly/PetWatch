const mongoose = require('mongoose');
const { validatePhone, validateEmail } = require('../validators/userValidators');
const {Currency} = require('../utils/enums');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true ,
        validate: {
            validator: validateEmail,
            message: 'Invalid email address'
        }

    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: validatePhone,
            message: 'Invalid phone number'
        }
    },
    password: {
        type: String,
        required: true
    },
    pets: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet' 
    }],
    totalExpenses: {
        type: Number,
        default: 0 
    },
       // Account settings
    notificationPreferences: {
        email: {
            type: Boolean,
            default: true
        },
        vaccineTime: {
            type: Boolean,
            default: true
        },
        routineCareTime: {
            type: Boolean,
            default: true
        },
        // Add more notification preferences as needed
    },
    theme: {
        type: String,
        default: 'light' // Or any default theme
    },
    currency: {
        type: String,
        enum: Object.values(Currency),
        default: Currency.ILS
    },
    imageUrl: {
        type: String,
        default: null
    },
    resetCode: {
       type: String 
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

// method that remove sensitive information from the schema
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    // remove the password field from the object
    delete userObject.password;
    return userObject;
  };

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };


