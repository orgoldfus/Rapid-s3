# Rapid-s3
s3-like Object Storage API (RapidAPI code challenge)
 
 ## How to use?
 1. clone the repository
 ```
 git clone https://github.com/orgoldfus/Rapid-s3.git
 ```

 2. Start a mongodb server (you can use the supplied docker-compose file:
 ```
 docker-compose up
 ```
 this will start a mongodb server and a mongo-express server to allow easy DB management.)

3. Define the required environment variables:
* `DB_HOST` - The mongodb server address. If the default docker-compose file is used to create the db, the address should be: `mongodb://localhost:27017`
* `DB_NAME` - The db name. If this env varibale is not defined, the name `rapids3` is used by default.
* `STORAGE_PATH` - The path to the storage folder. Uploaded files will be stored in this folder. The folder must be created manually before starting the server.

**The easiest way to define these variables is by adding them to a `.env` file.**

4. Install the required dependencies by running `yarn`

5. start the server:
```
yarn start
```

***

Here are the available API endpoints:

### Upload file - `POST /:userId`
Allows a user uploading a file. Body type should be `form-data`.

#### Allowed props:
* `file` - the uploaded file 
* `accessType` - can be either `private` or `public`

#### Response:
If the upload ended succefully, a JSON object in the following struvture will be returned:
```
{
    "fileId": "84a8b2e3a8c46803cea5a425cf684c30",
    "accessType": "public"
}
```

or, for private files:
```
{
    "fileId": "cbff509b837fb15a1d05475d60a76b9d",
    "accessType": "private",
    "accessToken": "Cz1Xj_7gF"
}
```

### Update file metada - `POST /:userId/:fileIdentifier`
Allows a user updating a previously uploaded file metadata (currently - only access type). Body type should be JSON.
fileIdentifier is the file name (e.g: `example.txt`) if the file is `public` and file Id if the file is `private`.
Also, if the file current accessType is `private`, an access token should be provided as a query param (e.g: `localhost:3000/hT9Lmdx/cbff509b837fb15a1d?access_token=GkVflhqld`).

#### Allowed props:
* `accessType` - can be either `private` or `public`

#### Response:
If the update ended succefully, a JSON object in the following struvture will be returned:
```
{
    "fileId": "84a8b2e3a8c46803cea5a425cf684c30",
    "accessType": "public"
}
```

or, for private files:
```
{
    "fileId": "cbff509b837fb15a1d05475d60a76b9d",
    "accessType": "private",
    "accessToken": "Cz1Xj_7gF"
}
```