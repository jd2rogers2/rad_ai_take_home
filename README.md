
# Rad AI Take Home

**Description of the problem and solution**
  - build an app that allows users to see a list of food trucks in the SF area and search by food truck name (applicant), permit approval status, location
  - solution: fastapi proxy layer with local filter, 3rd party API, and google maps API hits; and react SPA page with filter form and table in same view

**Reasoning behind your technical/architectural decisions**
- single page and single endpoint service
- so probably could've gone with a lighterweight frontend but react is popular if other devs join the project
- and react is my personal strength
- needed to be a python BE so i opted for FastAPI because it comes with swagger out of the box
- and i have experience with FastAPI

**What would you have done differently if you had spent more time on this?**
  - make table sortable
  - make lat long inputs into clickable map, and use your location
  - pagination
  - clean up ui
    - style it
    - scrolling table

**What are the trade-offs you might have made?**
  - I would have stored the data in our own DB, incurring a cost but gaining control (of data schema, data cleanliness, filtering at query level)

**What are the things you left out?**
  - more tests
    - would need to mock requests and googlemaps
    - FE tests

**What are the problems with your implementation and how would you solve them if we had to scale the application to a large number of users?**
  - re-getting list of entire trucks for every request, could cache locally
  - it's slow to check every food truck's distance from the user. could pre-compute that when they land on the page and then cache
  - bad ui for user to input their lat/long. replace with FE mapping lib

### running the application

```sh
docker compose build
docker compose up
```

navigate to:

- BE at http://localhost:8000/docs
- FE at http://localhost:5173

### running tests

from inside docker container:

```sh
python -m pytest
```
