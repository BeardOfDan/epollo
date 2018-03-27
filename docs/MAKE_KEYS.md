# Make Keys

To run this, a developer must either have the api keys or make his own.

## Making new API keys

  Google's Oauth:
    * Go to https://console.developers.google.com/apis/dashboard
    * Click 'ENABLE APIS AND SERVICES'
    * Type 'google+' into the search bar
    * Select 'Google+ API'
    * Enable the API and create the credential
    * Use the credentials to set the environment variables 'GOOGLE_CLIENT_ID' and 'GOOGLE_CLIENT_SECRET'

  Note: Don't forget to make sure you created a project for your application
  Note: Good practice dictates that you use a seperate project (and therefore seperate credentials) for the development and production versions of the app


