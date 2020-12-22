// This controller file handles the requests meant for bugs table
/**
 * Exported function that handles different requestes related to Bugs table
 * @param dbModels - Object that holds all the models created to represent the db tables
 */
export default function bugs(dbModels) {
  /**
   *
   * @param request - HTTP request object received through the routes.mjs
   * @param response - HTTP response object received through the routes.mjs
   *                 - To send response back
   *
   * Function that renders the home page
   */
  const createNewBug = ((request, response) => {
    console.log('createNewBug');
    const { problem, errorText, commit } = request.body;
    console.log(`Request: ${problem}, ${errorText}, ${commit}`);
    dbModels.Bug.create({ problem, errorText, commit })
      .then((newBug) => {
        const newBugData = newBug.toJSON();
        console.log(newBugData);
        response.send(newBugData);
      })
      .catch((err) => {
        console.log(err);
        response.send(err); });
  });

  /**
   * Function reads all the data from the Bugs table and send the JSON converted data as reposnse
   * @param request - http request
   * @param response - http response
   */
  const getAllBugs = (request, response) => {
    console.log('getAllBugs');
    dbModels.Bug.findAll()
      .then((returnedBugs) => {
        console.log(returnedBugs.toJSON());
        response.send(returnedBugs.toJSON());
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  };

  // The root() function wil return the functions defined
  // to render the homePage
  return {
    createNewBug, getAllBugs,
  };
}
