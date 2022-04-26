/*
  Functions used to work with Event related data
*/


// Get a db connection
import { Supabase } from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllCinemas() {

    // define variable to store events
    let cinemas;

    // execute request
    // Note await in try/catch block
    try {
      // IMPORTANT FOR OUR DATABASE!!!!!!
      // Supabase API query equivelent to:
      // select *, cinema.name from shows, cinema order by timestamp desc;
      const result = await Supabase
        .from('cinema')
        .select('*')
        .order('location', { ascending: true });
        

      // rresult.data contains the shows
      cinemas = await result.data;
      // Debug
      console.log('show: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all cinema: ", error.message);
    } finally {
    }
    // return all products found
    return cinemas;
}


// Export
export {
  getAllCinemas
};
