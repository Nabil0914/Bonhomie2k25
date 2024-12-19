import mongoose from "mongoose";

const IndividualSportsRegistrationSchema = new mongoose.Schema({
    eventName : {
        type : String,
        required : false
    },
    eventType : {
        type : String,
        enum : ['boys', 'girls'],
        required : false
    },
    eventCategory : {
        type : String,
        enum : ['individual'],
        required : false
    },
    participantName: { 
        type: String, 
        required: true 
    },
    year: {
        type: String,
        required: true 
    },
    department: {
        type: String,
        required: true
    },
    rollNo: {
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    contactNo: { 
        type: String, 
        required: true 
    }
    // registrationDate: { 
    //     type: Date, 
    //     default: Date.now 
    // },
})

const IndividualSportsRegistration = mongoose.model("IndividualSportsRegistration", IndividualSportsRegistrationSchema);
export default IndividualSportsRegistration