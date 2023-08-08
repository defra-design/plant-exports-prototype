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
var sample = require('./sample.json');
var countries = require('./countries-full.json');
var countries2 = require('./countries-eu-ni.json');
var addresses = require('./addresses.json');
var addresses2 = require('./addresses-2.json');

//Order addresses by status (draft first)
addresses2.sort(function(a,b){

  var returnValue = 0;

  //DRAFT
  if(a.pheats.status == 'draft' && b.pheats.status != 'draft') {
    returnValue = -1
  } else if(a.pheats.status != 'draft' && b.pheats.status == 'draft') {
    returnValue = 1
  //WITH TRADER
  } else {
    if(a.pheats.status == 'withtrader' && b.pheats.status != 'withtrader') {
      returnValue = -1
    } else if(a.pheats.status != 'withtrader' && b.pheats.status == 'withtrader') {
      returnValue = 1
    //PENDING
    } else {
      if(a.pheats.status == 'pending' && b.pheats.status != 'pending') {
        returnValue = -1
      } else if(a.pheats.status != 'pending' && b.pheats.status == 'pending') {
        returnValue = 1
      //UPDATED
      } else {
        if(a.pheats.status == 'updated' && b.pheats.status != 'updated') {
          returnValue = -1
        } else if(a.pheats.status != 'updated' && b.pheats.status == 'updated') {
          returnValue = 1
        //REGISTERED
        } else {
          if(a.pheats.status == 'registered' && b.pheats.status != 'registered') {
            returnValue = -1
          } else if(a.pheats.status != 'registered' && b.pheats.status == 'registered') {
            returnValue = 1
          } else {
            //PAUSED
            if(a.pheats.status == 'paused' && b.pheats.status != 'paused') {
              returnValue = -1
            } else if(a.pheats.status != 'paused' && b.pheats.status == 'paused') {
              returnValue = 1
            } else {
              //REJECTED
              if(a.pheats.status == 'rejected' && b.pheats.status != 'rejected') {
                returnValue = -1
              } else if(a.pheats.status != 'rejected' && b.pheats.status == 'rejected') {
                returnValue = 1
              }
            }
          }
        }
      }
    }
  }

  

  return returnValue;

});

module.exports = {
  "applications" : applications,
  "applicationsv2" : applicationsv2,
  "applicationsv3" : applicationsv3,
  "applicationsv4" : applicationsv4,
  "applicationsv5" : applicationsv5,
  "applicationsv6" : applicationsv6,
  "commodities" : [],
  "id_count" : 1,
  "sample": sample,
  "plants" : [],
  "countries-full": countries,
  "countries-eu-ni": countries2,
  "addresses": addresses,
  "addresses2": addresses2
  // Insert values here
  
}
