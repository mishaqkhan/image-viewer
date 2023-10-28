# image-viewer

### Running the application

Open up a terminal and from the project root run:

```shell
docker compose up --build -V
```

After docker containers are up and running, you can view the app on:

```shell
http://localhost:8000
```

Api endpoints:

```shell
POST - http://localhost:8000/api/image
GET - http://localhost:8000/api/images
GET - http://localhost:8000/api/images/:id
DELETE - http://localhost:8000/api/images/:id
PATCH - http://localhost:8000/api/images/:id
```
