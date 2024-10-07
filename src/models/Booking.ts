import mongoose, { models,model, Schema }  from "mongoose"; 

interface IBoking extends mongoose.Document {
    guestName: string;
    guestEmail: string;
    guestNotes: string;
    when: Date;
    eventTypeId: string;

};


const BookinSchema = new Schema<IBoking>({  
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestNotes: { type: String, required: false },
    when: { type: Date, required: true },
    eventTypeId: { type: String, required: true }


});

export const BookingModel = models?.Booking || model<IBoking>("Booking", BookinSchema);