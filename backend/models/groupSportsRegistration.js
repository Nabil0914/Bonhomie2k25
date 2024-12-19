import mongoose from "mongoose";

const GroupSportsRegistrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['boys', 'girls'],
    required: true
  },
  eventCategory: {
    type: String,
    enum: ['group'],
    required: true
  },
  teamLeader: {
    name: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true }
  },
  teammates: [
    {
      name: { type: String, required: true },
      year: { type: String, required: true },
      department: { type: String, required: true },
      rollNo: { type: String, required: true },
      email: { type: String, required: true },
      contactNo: { type: String, required: true }
    }
  ],
  registrationDate: { type: Date, default: Date.now }
});

const GroupSportsRegistration = mongoose.model("GroupSportsRegistration", GroupSportsRegistrationSchema);
export default GroupSportsRegistration;
