import express from "express";
import IndividualSportsRegistration from "../models/individualSportsRegistration.js";
import GroupSportsRegistration from "../models/groupSportsRegistration.js";

const router = express.Router();

// Route to get individual event registrations (Dynamic)
router.get('/registrations/individual/:eventName/:eventType', async (req, res) => {
    const { eventName, eventType } = req.params;
    
    try {
      const registrations = await IndividualSportsRegistration.find({
        eventName,
        eventType,
        // eventCategory: 'individual',
      });
  
      if (!registrations || registrations.length === 0) {
        return res.status(404).json({ message: 'No registrations found for this event.' });
      }
  
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching registrations', error: error.message });
    }
  });

  router.post('/registrations/individual/:eventName/:eventType', async (req, res) => {
    try {
      const registration = new IndividualSportsRegistration(req.body);
      await registration.save();
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ message: 'Error creating registration', error: error.message });
    }
  });


// Route to get all registrations for a specific event (Both individual and group)
router.get('/registrations/:eventName', async (req, res) => {
    const { eventName } = req.params;
  
    try {
      const individualRegistrations = await IndividualSportsRegistration.find({ eventName });
      const groupRegistrations = await GroupSportsRegistration.find({ eventName });
  
      const allRegistrations = {
        individual: individualRegistrations,
        group: groupRegistrations,
      };
  
      res.status(200).json(allRegistrations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all registrations', error: error.message });
    }
  });
  
  router.post('/registrations/:eventName', async (req, res) => {
    try {
      const registration = new GroupSportsRegistration(req.body);
      await registration.save();
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ message: 'Error creating registration', error: error.message });
    }
  });
  
  export default router;