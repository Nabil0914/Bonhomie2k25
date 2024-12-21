import mongoose from "mongoose";

const GroupSportsRegistrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: false
  },
  eventType: {
    type: String,
    enum: ['boys', 'girls'],
    required: false
  },
  eventCategory: {
    type: String,
    enum: ['group'],
    required: false
  },
  teamLeader: {
    name: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true }
  },
  teammates: [
    {
      name: { type: String, required: true },
      year: { type: String, required: true },
      department: { type: String, required: true },
      rollNo: { type: String, required: true }
    }
  ],
  registrationDate: { type: Date, default: Date.now }
});

const GroupSportsRegistration = mongoose.model("GroupSportsRegistration", GroupSportsRegistrationSchema);
export default GroupSportsRegistration;
