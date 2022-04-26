/*
  Functions used to work with Event related data
*/


// Get a db connection
import { Supabase } from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllShows(orderCol= 'timestamp', asc = false) {

    // define variable to store events
    let shows;

    // execute request
    // Note await in try/catch block
    try {
      // IMPORTANT FOR OUR DATABASE!!!!!!
      // Supabase API query equivelent to:
      // select *, cinema.name from shows, cinema order by timestamp desc;
      const result = await Supabase
      .from('show')
      .select('*, cinema(location)')
      .order(orderCol, { ascending: asc });
        

      // result.data contains the shows
      shows = await result.data;
      // Debug
      console.log('I shit meself: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all shows: ", error.message);
    } finally {
    }
    // return all products found
    return shows;
}


async function getShowById(id) {

  // to do: validate id

  // define variable to store shows
  let show;

  // execute request
  // Note await in try/catch block
  try {
    // Execute the query
    const result = await Supabase
      .from('show')
      .select('*, cinema(location)')
      .eq('id', id)
      .order('timestamp', { ascending: false });

    // first element of the record set contains products
    show = await result.data;
    console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return show;
}

// Get shows for a cinema, by its id
//
async function getShowsByCinemaId(id) {

  // to do: validate id

  // define variable to store shows
  let shows;

  // execute db query
  try {
    // Execute the query
    const result = await Supabase
      .from('show') // select from shows
      .select('*, cinema(location)') // * from shows and name from cinemas
      .eq('cinema_id', id) // where cinema_id == id
      .order('timestamp', { ascending: false }); // order by timestamp

    // first element of the recordset contains products
    shows = await result.data;
    console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return shows;
}

// Find events using a text search
// https://supabase.com/docs/reference/javascript/textsearch
// https://supabase.com/docs/reference/javascript/using-filters
async function searchFilter(search) {
  // define variable to store events
  let shows;

  // execute request
  try {
    // Execute the query
    const result = await Supabase
      .from('show') // from events
      .select('*, cinema(location)') // select all and computers.name
      .textSearch('start_time', `'${search}'`) // filter result where description contains the search term
      .order('timestamp', { ascending: false }); // sort by timestamp

    // get data from result
    shows = await result.data;
    //console.log('events: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all events found
  return shows;
}

// Export
export {
  Supabase,
  getAllShows,
  getShowById,
  getShowsByCinemaId,
  searchFilter
};
