// This controller file handles the requests meant for Features table
/**
 * Exported function that handles different requestes related to Features table
 * @param dbModels - Object that holds all the models created to represent the db tables
 */
export default function features(dbModels) {
  /**
   * Function reads all the data from the Features table
   * and send the JSON converted data as reposnse
   * @param request - http request
   * @param response - http response
   */
  const getAllFeatures = (request, response) => {
    console.log('getAllFeatures');
    dbModels.Feature.findAll()
      .then((returnedFeatures) => {
        console.log(returnedFeatures.toJSON());
        response.send(returnedFeatures.toJSON());
      })
      .catch((err) => {
        console.log(err);
        response.send(err);
      });
  };

  return { getAllFeatures };
}
