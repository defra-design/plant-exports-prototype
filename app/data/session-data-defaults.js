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
var applications = require('./applications.json');
var applicationsv2 = require('./applications-v2.json');
var applicationsv3 = require('./applications-v3.json');
var applicationsv4 = require('./applications-v4.json');
var applicationsv5 = require('./applications-v5.json');
var applicationsv6 = require('./applications-v6.json');
var applicationsv7 = require('./applications-v7.json');
var applicationsv8 = require('./applications-v8.json');
var applicationsv9 = require('./applications-v9.json');
var sample = require('./sample.json');
var countries = require('./countries-full.json');
var countries2 = require('./countries-eu-ni.json');
var countries3 = require('./countries-full-2.json');
var countries4 = require('./countries-poe.json');
var addresses = require('./addresses.json');
var addresses2 = require('./addresses-2.json');
var addresses3 = require('./addresses-3.json');

module.exports = {
  "applications" : applications,
  "applicationsv2" : applicationsv2,
  "applicationsv3" : applicationsv3,
  "applicationsv4" : applicationsv4,
  "applicationsv5" : applicationsv5,
  "applicationsv6" : applicationsv6,
  "applicationsv7" : applicationsv7,
  "applicationsv8" : applicationsv8,
  "applicationsv9" : applicationsv9,
  "commodities" : [],
  "id_count" : 1,
  "sample": sample,
  "plants" : [],
  "countries-full": countries,
  "countries-eu-ni": countries2,
  "countries-full-2": countries3,
  "countries-poe": countries4,
  "addresses": addresses,
  "addresses2": addresses2,
  "addresses3": addresses3,
  "ephytoEmailNotifications": "All"
  // Insert values here
}
