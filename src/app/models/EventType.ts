
// The code will be executed in the server
import mongoose from "mongoose";

const FromToSchema = new mongoose.Schema({ // Define the schema for the from-to field, a schema is a blueprint for the data
    from: String,
    to: String,
    active: Boolean, 
}
);

const BookingSchema = new mongoose.Schema({
    monday: FromToSchema,
    tuesday: FromToSchema,
    wednesday: FromToSchema,
    thursday: FromToSchema,
    friday: FromToSchema,
    saturday: FromToSchema,
    sunday: FromToSchema,
  });

const EventTypeSchema = new mongoose.Schema({ // Define the schema for the event type, a schema is a blueprint for the data
    email: String,
    title: String,
    description: String,
    lenght: Number,
    bookingTimes: BookingSchema,

},
{
    timestamps: true, // Add timestamps to the schema to track when the data was created and updated
}
);



export default mongoose.models?.EventType || mongoose.model('EventType', EventTypeSchema); // Export the model for the event type
