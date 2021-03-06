<p align="center"><img src="https://i.imgur.com/lBieCZn.png" width="300"></p>

# JsonStream

Public API service that exposes plenty of endpoints of node.js back-end integrated with database to be used as a persistent access-from-anywhere storage. The API itself is not RESTful (for example it allows user to perform removal operation over database using POST request) since it only offers GET and POST service endpoints by architectural definition.

| Endpoint  |  HTTP Method |
| ------------- | ------------- |
| /api/get  | `GET`  |
| /api/get/:key  | `GET` |
| /api/set/:value  | `GET`  |
| /api/set/:key/:value  | `GET` |
| /api/remove/:key  | `GET` |
| /api/list | `GET` |
| /api/kick  | `GET` |
| /api/kick/:key  | `GET` |
| /api/get | `POST` |
| /api/set | `POST` |
| /api/remove | `POST` |

Find more at https://jsonstream.herokuapp.com.
