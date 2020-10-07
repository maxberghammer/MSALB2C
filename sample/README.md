# Angular 10 MSAL.js 2.x Sample for AADB2C

## About this sample

This developer sample is used to demonstrate how to use MSAL.js in Angular 10 with AADB2C.

It is based on this [original](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v2-samples/angular10-browser-sample)

## How to run the sample

### Pre-requisites
- Ensure [all pre-requisites](../../../lib/msal-browser/README.md#prerequisites) have been completed to run msal-browser.

### Configure the application
- Open `./src/app/app.modules.ts` in an editor.
- Replace client id with the Application (client) ID from the portal registration, or use the currently configured lab registration. 
  - Optionally, you may replace any of the other parameters, or you can remove them and use the default values.

### Running the sample
- In a command prompt, run `npm start`.
- Navigate to [http://localhost:4200](http://localhost:4200)
- In the web page, click on the "Login" button. The app will automatically reload if you change any of the source files.
