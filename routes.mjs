import dbModels from './models/index.mjs';
import root from './controllers/root.mjs';
import bugs from './controllers/bugs.mjs';
import features from './controllers/features.mjs';

// import your controllers here

export default function routes(app) {
  console.log('routes');
  // initialize the controller functions here
  // pass in the db for all callbacks

  // defines route matchers here using app

  const RootController = root();
  // To handle the '/'
  app.get('/', RootController.getHomePage);

  const bugController = bugs(dbModels);
  app.post('/createBug', bugController.createNewBug);
  app.get('/getAllBugs', bugController.getAllBugs);

  const featureController = features(dbModels);
  app.get('/getAllFeatures', featureController.getAllFeatures);
}
