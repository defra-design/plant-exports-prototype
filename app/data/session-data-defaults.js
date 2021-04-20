/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/
var applications = require('./applications.json')
var sample = require('./sample.json')

module.exports = {
  "applications" : applications,
  "commodities" : [],
  "id_count" : 1,
  "sample": sample,
  "plants" : []
  // Insert values here
}
