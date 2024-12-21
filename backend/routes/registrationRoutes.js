import IndividualSportsRegistration from "../models/individualSportsRegistration.js";
import GroupSportsRegistration from "../models/groupSportsRegistration.js";

// API to register individual participants
export const individual = async (req, res) => {
  try {
    const {
      participantName,
      year,
      department,
      rollNo,
      email,
      contactNo,
      eventName,
      eventType,
      eventCategory,
    } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!participantName || !year || !department || !rollNo || !email || !contactNo) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // Log request body for debugging
    console.log(req.body);

    // Create new registration
    const newParticipant = new IndividualSportsRegistration({
      participantName,
      year,
      department,
      rollNo,
      email,
      contactNo,
      eventName,
      eventType,
      eventCategory,
    });

    // Save to database
    await newParticipant.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newParticipant,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number already exists.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const group = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      eventCategory,
      teamLeader,
      teammates,
    } = req.body;

    // Validate required fields
    if (
      !eventName ||
      !eventType ||
      !eventCategory ||
      !teamLeader ||
      !teammates ||
      !Array.isArray(teammates) ||
      teammates.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled, and teammates must be an array.",
      });
    }

    // Validate team leader details
    const {
      name,
      year,
      department,
      rollNo,
      email,
    } = teamLeader;

    if (!name || !year || !department || !rollNo || !email) {
      return res.status(400).json({
        success: false,
        message: "Team leader details are incomplete.",
      });
    }

    // Validate teammates
    for (let i = 0; i < teammates.length; i++) {
      const { name, year, department, rollNo} = teammates[i];
      if (!name || !year || !department || !rollNo) {
        return res.status(400).json({
          success: false,
          message: `Teammate ${i + 1} details are incomplete.`,
        });
      }
    }

    // Create new group registration
    const newGroupRegistration = new GroupSportsRegistration({
      eventName,
      eventType,
      eventCategory,
      teamLeader,
      teammates,
    });

    // Save to database
    await newGroupRegistration.save();

    res.status(201).json({
      success: true,
      message: "Group registration successful!",
      data: newGroupRegistration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry detected.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};


