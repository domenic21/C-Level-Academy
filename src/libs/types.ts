export type FromTo = { //for the state of the booking times
    from: string;
    to: string;
    active: boolean;
    length: number;
  };
  
  export type WeekdayName = 'Monday' | 'Tuesday'
    | 'Wednesday' | 'Thursday' | 'Friday'
    | 'Saturday' | 'Sunday';
  
    export type BookingTimes = { // THIS IS THE TYPE THAT WE WANT TO GENERATE
        Monday?: FromTo;
        Tuesday?: FromTo;
        Wednesday?: FromTo;
        Thursday?: FromTo;
        Friday?: FromTo;
        Saturday?: FromTo;
        Sunday?: FromTo;
      };


