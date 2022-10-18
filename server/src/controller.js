const { router } = require('./router');

const controller = (request, response, query) => {
  const { url, method } = request;
  const [path, queryParams] = url.split('?');
  const queryParamsData = queryParams?.split('&')?.map((item) => item.split('=')) || [];
  const handler = router(path, method);
  // Enable CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  console.log(`${new Date}: Incoming request: ${method} ${url}`);
  handler(request, response, query, queryParamsData).then(()=>{
    console.log(`${new Date}: Response for ${method} ${url} sent`)
  });

}

module.exports = { controller };