# Backend

## Deployed URL:
### https://watermyplantsapiproject.herokuapp.com/

# Scripts

- **start**: Runs the app.
- **server**: Runs the app with Nodemon.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.


## User
      username:         *Required*,
      password:         *Required*,
      phone number:     *Required

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| Method | Endpoint                        | Returns                                                             | Parameters                                               
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| GET    | `/api/users`                    | `200` array of all users and thier phone number                     | 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| POST   | `/api/users/register`           | `201` with the registered user object                               | `username`, `phone number`
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| POST   | `/api/users/login`              | `200` with a welcome message                                        | `username` and`password` (required)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## plants

          nickname:   String        *Required*
          species:    String        *Required*
          scientific_name: String   *Required*
          h2oFrequency: String      *Required*
          img:        Img           * Not required*
          user_id: INT              *Required*
          
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| Method | Endpoint                                 | Returns                                                  | Parameters
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| GET    | `/api/plants:username`                   | `200` with array of items with user information & plants | takes in username
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| POST   | `/api/plants:username`                   | `201` with the created item object                       | takes in username & nickaname, species, h2oFrequency required
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| PUT    | `/api/plants/:id`                        | `200` with the updated item object                       |                                           
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| DELETE | `/api/plants/:id`                        | `200` with no content                                    |                                                                 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
