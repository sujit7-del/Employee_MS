import Annoucement from "../models/Announcement.js";

const createAnnouncement = async (req, res) => {
     try {
       // console.log(req?.user || "not here");
        
       const user = req.user; // this comes from your auth middleware
      // const adminId=req.user._id
       console.log(user._id);
       console.log(user.role);
       
       
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    
    const { title, body } = req.body;
    const newAnnouncement = new Annoucement({
       adminId:user._id,
      title:title,
      body:body,
     
    });
    await newAnnouncement.save();
    console.log("announcement created");
    
    res.status(201).json({ success: true, message: "Announcement created successfully", announcement: newAnnouncement });
  } 
  catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, error: "Server Error" });
    
}

}

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Annoucement.find({}).populate("adminId", "name email");
    // Sort by latest activity: max(createdAt, updatedAt)
announcements.sort((a, b) => {
  const latestA = new Date(Math.max(new Date(a.createdAt), new Date(a.updatedAt)));
  const latestB = new Date(Math.max(new Date(b.createdAt), new Date(b.updatedAt)));

  return latestB - latestA; // descending: latest activity first
});

    res.status(200).json({ success: true, announcements });
   //console.log("fetched announcements successfully");
  }
  catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
}
//getAnnouncementById
const getAnnouncementById = async (req, res) => {
  try {
    const annoucementId=req.params.id;
    const announcement = await Annoucement.findById(annoucementId);
    res.status(200).json({ success: true, announcement });
   console.log("fetched announcement successfully");
  }
  catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
}

//getTodayAnnouncements------------------
const getTodayAnnouncements = async (req, res) => {
  try {
       // 1. Define the start and end boundaries (as previously discussed)
        let startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        let startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        // 2. Create the Mongoose/MongoDB query object (the filter)
        const dateQueryFilter = {
            // Mongoose uses 'createdAt' by default if you have timestamps: true
            createdAt: {
                $gte: startOfToday,  // Greater than or equal to start of today
                $lt: startOfTomorrow // Less than start of tomorrow
            }
        };

       
       
    
       const todayAnnouncements = await Annoucement.find(dateQueryFilter).populate("adminId","name");
      // Sort by latest activity: max(createdAt, updatedAt)
todayAnnouncements.sort((a, b) => {
  const latestA = new Date(Math.max(new Date(a.createdAt), new Date(a.updatedAt)));
  const latestB = new Date(Math.max(new Date(b.createdAt), new Date(b.updatedAt)));

  return latestB - latestA; // descending: latest activity first
});

    res.status(200).json({ success: true, todayAnnouncements });
   console.log("fetched today announcements successfully",todayAnnouncements);
  }
  catch (error) {
    console.error("Error fetching Today announcements:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
}

// Update an announcement
const updateAnnouncement = async (req, res) => {
     try {

       const user = req.user; // this comes from your auth middleware

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
      const {title,body}=req.body;
    const annoucementId=req.params.id;

    const announcement = await Annoucement.findById(annoucementId);
    announcement.title=title;
    announcement.body=body;
    announcement.updatedAt=Date.now();
    await announcement.save();

    res.status(200).json({ success: true, announcement });
    console.log("fetched Updated successfully");
  }
  catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
}

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
  try{
     const user = req.user; // this comes from your auth middleware

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const announcementId=req.params.id;
  console.log(announcementId);
  if (!announcementId) {
    return res.status(400).json({success:false,error:"Bad Request"})
  }
  const announcement= await Annoucement.findByIdAndDelete(announcementId);
  if (!announcement) {
     console.log("announcement not found or exist ");
     return res.status(404).json({ success: false, error: "announcement not found" });
     
    
  }
  return res.status(200).json({ success: true, announcement });
}
catch(error){
   console.log("error ",error);
   return res.status(500).json({ success: false, error: "Server Error" });
   
}
  
};




export {  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  getTodayAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
};