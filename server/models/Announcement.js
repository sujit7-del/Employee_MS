import mongoose from 'mongoose'

const AnnoucementSchema = new mongoose.Schema({
    adminId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true },

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },

    


},{
  timestamps: true // <-- This is the key
});

const Annoucement = mongoose.model('Annoucement', AnnoucementSchema);
console.log(Annoucement);

export default Annoucement;