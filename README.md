
# Rad AI Take Home

- Description of the problem and solution
  - 
Reasoning behind your technical/architectural decisions
- Critique section:
  - What would you have done differently if you had spent more time on this?
    - make table sortable
    - make lat long inputs into clickable map, and use your location
    - pagination
    - clean up ui
      - style it
      - scrolling table
  - What are the trade-offs you might have made?
    - I would have stored the data in our own DB, incurring a cost but gaining control
    - 
  - What are the things you left out?
    - more tests
  - What are the problems with your implementation and how would you solve them if we had to scale the application to a large number of users?
- Steps necessary to run your solution and your tests:

### running the application

```sh
docker compose build
docker compose up
```

### running tests

```sh
python -m pytest
```
