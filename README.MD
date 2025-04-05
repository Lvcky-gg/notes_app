# Backend Microservice
- Using Python(Django).
- The reason for this choice: I know that I can reliably set up a service rapidly no matter how long I go without using this framework. Python also interops well with the machine learning world, so if needed we can pull in the libraries we need easily.
- TODO: Set up security features such as CSRF and CORS
- TODO: Send notes off to analysis service for anylitics, add necassary portion to model "sentiment_analysis: float"
- TODO: Set up prod(postgres) and dev(sqlite) databases based on .env
- TODO: pull in secret from .env file
# Frontend
- using TypeScript(Vue)
- the reason for this choice: Vue is very light weight and can still be used to build amazing applications. Given that there is not a need for a massive application here, I feel that it is a good choice.
- TODO: Solve CORS issue when dockerized
# Analysis Service
- currently set up as a Django Application. This does not make sense, I think a single endpoint for a Flask app would be better
- TODO: Set up flask application
- TODO: Make an endpoint that serves requests from the notes backend off to the model and returns the sentiment analysis(This should be a POST route)
# Authentication
- I could set up a JWT
- Since I am using Django, I could use the purpose built library from djangorestframework
- then set up a user object
- next I need to set up authentication routes to make the tokens for the users
- I should also protect anything that isn't a read with both the authenticatied permisions and user id
- remember to set them in cookies
- some other security considerations: cors and csrf need debugging
- consider encryption for JWT
# Running 
- backend-service and can both be run via their ./docker.sh files
- int terminal simply type ./docker.sh
## Building the backend
- cd backend-service
- run pipenv shell
- run ./build.sh
- run ./docker.sh for dockerized or ./start.sh for venv
## Frontend is not properly dockerized yet
- cd frontend
- run npm install
- npm run dev
## future plan
- orchestrate all four services(includes prod database) via docker-compose

## url_tests.js
- simply for testing and development in case somebody doesn't intend on using postman. I have provided fetch examples to paste in console