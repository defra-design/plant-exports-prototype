# plant-exports-prototype
Plant exports prototype


Deployed URL: https://defra-plant-exports.herokuapp.com/

## Installation

```
npm install
npm start
```

## Notes from prototype version upgrade

Follow the GDS guide: https://govuk-prototype-kit.herokuapp.com/docs/updating-the-kit

Additionally there are changes in the follow:
`app/config.js` Cookie warning text 
`app/extra-filters.js`  Additional status tags cf original
`lib/util.js` Extra functions to handleCookies and to synchronously get the URL for the latest release on GitHub and cache it