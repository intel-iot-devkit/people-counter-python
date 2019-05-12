# Intel People Counter
Based on the Amplified starter kit, which uses...

- Webpack 2  
- React  
- Redux  
- Redux Thunk
- React Redux Router
- CSS Next
- Jest + Enzyme
- AirBnB ESLint  
  

### Requirements:
- Node 7.7.4+  
- Npm 4.1.2+  


### Setup
Update to latest packages:  
```
npm update --save --dev
```

Install dependencies:  
```
npm install
```


### Development
Start a local development server at http://localhost:8080/, build project, and watch files.
```
npm run dev
```
> You can access the dev build from any device on the network through your network IP address. If you don't know your IP, use this tool to find it https://www.npmjs.com/package/dev-ip  

Note, also needs a server, which can be found at SERVER_URL_HERE


### Testing
Any unit tests can be run with:
Note: as of 5/17/2017 running the test suite gives this warning:  
_Warning: ReactTestUtils has been moved to react-dom/test-utils. Update references to remove this warning._  
```
npm run test
```


### Production
Build project to dist/ folder for deployment:
```
npm run dist
```  
  

### ESLint with AirBnB config

https://github.com/airbnb/javascript  

If using Sublime Text 3:  
1. Use package installer to install SublimeLinter and SublimeLinter-contrib-eslint.
2. Copy the airbnb config contents to your user settings file: https://github.com/airbnb/javascript/blob/master/linters/SublimeLinter/SublimeLinter.sublime-settings
3. In Tools -> SublimeLinter make sure Debug Mode is checked
4. Also set Lint Mode to your desired setting
5. Restart Sublime 
6. You can see the error message on a line by placing your cursor on it, or all errors for the file in the console by hitting ctrl + `


### Folder Structure
__assets__   
> Contains all static assets. Create folders for fonts, images, and anything else.  

__components__  
> Small and highly reusable interface elements, these should rarely if ever be connected to redux.  

__constants__  
> Application constants for both js and css.  

__dux__  
> Short for redux in ducks style, there is generally one dux file per feature. Each dux file contains actions, action creators, and a reducer.  

__features__  
> Larger and more complex interface elements which generally do not get re-used. These will often be connected to redux via a Connected wrapper file.

__pages__  
> Entire application views which are rendered by the router.

.  
.  
.  


### Styles
This repo does not include any CSS libraries.  
For a total CSS reset use https://www.npmjs.com/package/reset-css
```
npm install --save reset-css
```

Otherwise install normalize https://www.npmjs.com/package/normalize.css/
```
npm install --save normalize.css
```


### Internationalization
This repo does not include internationalization features by default.  
The recommended package to handle locale string swapping and formatting is react-intl.  
Full documentation here: https://github.com/yahoo/react-intl/wiki  

.  
.  
.  


### Notes
The server must be able to handle push state urls like localhost:8080/user/bob_ross and serve up the index page from any route.  


If your project is not hosted at the root domain, you will need to tell the router how to handle route parsing. This thread has information on options: https://github.com/ReactTraining/react-router/issues/353  
  

Hot Module Replacement doesn't seem to be working for javascript changes, it refreshes the entire page.


.  
.  
.  

