import dbModels from './models/index.mjs';
import root from './controllers/root.mjs';
import bugs from './controllers/bugs.mjs';
import features from './controllers/features.mjs';
import userValidator from './controllers/userValidator.mjs';
import users from './controllers/users.mjs';

// import your controllers here

export default function routes(app) {
  console.log('routes');

  // Set the middleware to authenticate the user
  const userValidatorLib = userValidator(dbModels);
  console.log(userValidatorLib);
  app.use(userValidatorLib.authenticateRequestUsingCookies);

  // initialize the controller functions here
  // pass in the db for all callbacks

  // defines route matchers here using app

  const RootController = root();
  // To handle the '/'
  app.get('/', RootController.getHomePage);

  // Accept a POST request to log a user in.
  app.post('/login', userValidatorLib.handleLoginRequest);

  // Accept a POST request to create new user
  const userController = users(dbModels);
  app.post('/sign-up', userController.createNewUser);

  const bugController = bugs(dbModels);
  app.post('/createBug', bugController.createNewBug);
  app.get('/getAllBugs', bugController.getAllBugs);

  const featureController = features(dbModels);
  app.get('/getAllFeatures', featureController.getAllFeatures);
}
