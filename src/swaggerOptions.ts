export const swagger = {
    "openapi": "3.0.3",
    "info": {
      "title": "Curso de BackendI 3.0",
      "description": "Esto es solo un ejemplo de una descripcion",
      "version": "1.0.11"
    },
    "servers": [
      {
        "url": "http://localhost:4300/"
      }
    ],
    "tags": [
      {
        "name": "user",
        "description": "descripcion usuario"
      }
    ],
    "paths": {
      "/user": {
        "post": {
          "tags": [
            "user"
          ],
          "summary": "Create user",
          "description": "Crea un usuario nuevo.",
          "operationId": "createUser",
          "requestBody": {
            "description": "Created user object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "/user/{username}": {
        "get": {
          "tags": [
            "user"
          ],
          "summary": "Get user by user name",
          "description": "",
          "operationId": "getUserByName",
          "parameters": [
            {
              "name": "username",
              "in": "path",
              "description": "The name that needs to be fetched. Use user1 for testing. ",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid username supplied"
            },
            "404": {
              "description": "User not found"
            }
          }
        },
        "put": {
          "tags": [
            "user"
          ],
          "summary": "Update user",
          "description": "This can only be done by the logged in user.",
          "operationId": "updateUser",
          "parameters": [
            {
              "name": "username",
              "in": "path",
              "description": "name that need to be deleted",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "description": "Update an existent user in the store",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "successful operation"
            }
          }
        },
        "delete": {
          "tags": [
            "user"
          ],
          "summary": "Delete user",
          "description": "This can only be done by the logged in user.",
          "operationId": "deleteUser",
          "parameters": [
            {
              "name": "username",
              "in": "path",
              "description": "The name that needs to be deleted",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid username supplied"
            },
            "404": {
              "description": "User not found"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64",
              "example": 10
            },
            "username": {
              "type": "string",
              "example": "theUser"
            },
            "firstName": {
              "type": "string",
              "example": "John"
            },
            "lastName": {
              "type": "string",
              "example": "James"
            },
            "email": {
              "type": "string",
              "example": "john@email.com"
            },
            "password": {
              "type": "string",
              "example": "12345"
            },
            "phone": {
              "type": "string",
              "example": "12345"
            },
            "userStatus": {
              "type": "integer",
              "description": "User Status",
              "format": "int32",
              "example": 1
            }
          },
          "xml": {
            "name": "user"
          }
        }
      },
      "requestBodies": {
        "UserArray": {
          "description": "List of user object",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    }
  }
  