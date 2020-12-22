// This controller file handles the requests meant for root

export default function root() {
  /**
   *
   * @param request - HTTP request object received through the routes.mjs
   * @param response - HTTP response object received through the routes.mjs
   *                 - To send response back
   *
   * Function that renders the home page
   */
  const getHomePage = ((request, response) => {
    console.log('getHomePage');
    response.render('homePage');
  });

  // The root() function wil return the functions defined
  // to render the homePage
  return {
    getHomePage,
  };
}
