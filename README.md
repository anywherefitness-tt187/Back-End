# Back-End

endpoints
https://anywherefitness187.herokuapp.com/

| Action                                               | URL                       | Method |
| :--------------------------------------------------- | :------------------------ | :----- |
| Reach the API                                        | /                         | GET    |
| Register a user                                      | api/auth/register         | POST   |
| Login a user                                         | api/auth/login            | POST   |
| Get a list of users                                  | api/users                 | GET    |
| Get a user by id                                     | api/users/:id             | GET    |
| Get an instructors classes                           | api/users/:id/class       | GET    |
| Add a class for an instructor                        | api/users/:id/class       | POST   |
| Find classes                                         | api/class                 | GET    |
| Find a class by its id                               | api/class/:id             | GET    |
| Update a class                                       | api/class/:id             | PUT    |
| Delete a class                                       | api/class/:id             | DELETE |
| Register a student to a class                        | api/class/:id/clients     | POST   |
| Get a list of students registered to a class         | api/class/:id/clients     | GET    |
| Get a list of all students registered to ALL classes | api/registered_client     | GET    |
| Get a student registered to a class by id            | api/registered_client/:id | GET    |
| Delete a student from a class                        | api/registered_client/:id | DELETE    |

## REGISTRATION DATA

## role is either instructor or client

| PROPERTY | TYPE   | EXAMPLE    | Notes    |
| :------- | :----- | :--------- | :------- |
| username | string | "username" | required |
| password | string | "password" | required |
| role | string | "client" | required | 

## LOGIN DATA

| PROPERTY | TYPE   | EXAMPLE    | Notes    |
| :------- | :----- | :--------- | :------- |
| username | string | "User"     | required |
| password | string | "password" | required |

## Create a class

| PROPERTY       | TYPE   | EXAMPLE               | Notes    |
| :------------- | :----- | :-------------------- | :------- |
| class_name     | string | "Fitness Galore"      | required |
| class_type     | string | "Cross Fit "          | required |
| class_intesity | string | "Hard"                | required |
| class_location | string | "1 New York ave"      | required |
| start_time     | string | "Jan 1, 2020 2:30 PM" | required |
| class_duration | string | "2 hours"             | required |
| class_max_size | number | 30                    | required |

## Register to a class

| PROPERTY    | TYPE   | EXAMPLE             | Notes    |
| :---------- | :----- | :------------------ | :------- |
| client_name | string | "Larry the Lobster" | required |
