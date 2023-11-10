// There might be a better way to use this data.

// Data sources (located in the 'app/data' root folder)
var applications = require('./data/applications.json');
var applicationsv2 = require('./data/applications-v2.json');;
var applicationsv3 = require('./data/applications-v3.json');
var applicationsv4 = require('./data/applications-v4.json');
var applicationsv5 = require('./data/applications-v5.json');
var applicationsv6 = require('./data/applications-v6.json');
var applicationsv7 = require('./data/applications-v7.json');
var sample = require('./data/sample.json');
const e = require('express');

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  // Get application information
  // All prototype versions up to v1-34
  filters.appInfo = function (id, key) {
    
    var app = {};
    
    applications.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v2)
  // Prototype versions 1-35 to 1-38
  filters.appInformation = function (id, key) {
    
    var app = {};
    
    applicationsv2.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v3)
  // Prototype version 1-39
  filters.appInformationV3 = function (id, key) {
    
    var app = {};
    
    applicationsv3.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v4)
  // Prototype version 1-40
  filters.appInformationV4 = function (id, key) {
    
    var app = {};
    
    applicationsv4.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v5)
  // Prototype version 1-41 onward
  filters.appInformationV5 = function (id, key) {
    
    var app = {};
    
    applicationsv5.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v6)
  // Prototype version 1-42 onward
  filters.appInformationV6 = function (id, key) {
    
    var app = {};
    
    applicationsv6.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Get application information (v7)
  // Prototype version 3-0 onward
  filters.appInformationV7 = function (id, key) {
    
    var app = {};
    
    applicationsv7.forEach(function (item) {
      
      if (item.index == id) {
        app = item;
      }

    })

    return app[key];
  }

  // Show hide infomation based on search results
  filters.showHide = function (obj, text) {
    var query = text.split();
    
    for (key in obj) {
      
      for (var v = 0; v < query.length; v++) {
        
        if (obj[key].indexOf(query[v]) != -1) {
          return "show";
        }

      }

    }

    return "hide";
  }

  // Way of increasing a number in nunjucks
  filters.increase = function (num) {
    return num += 1;
  }

  filters.toMonth = function (x) {
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if (x > 0) {
      // returns date as per month
      return months[x - 1];
    }
    else {
      return x;
    }

  }

  filters.toMoney = function (x) {
    return ("£" + x);
    // TO ADD - case to handle nothing being there
  }

  filters.getCommodity = function (str, val) {
    console.log("looking up commodity: " + val);
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(str);

    // matches[1] contains the value between the parentheses
    console.log(matches[1]);
    
    for (key in sample) {
      console.log("found " + sample[key].eppocode);
      
      if (sample[key].eppocode == matches[1]) {
        return sample[key][val];
      }

    }

  }

  // Way of increasing a number in nunjucks
  filters.getRandomSerial = function (num) {
    let str= "";
    
    for (var i=0; i<num; i++){
      str += Math.floor(Math.random()*10);
    }

    return str;
  }

  /* ------------------------------------------------------------------
    
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
  Added by DH 18/5 - for passing array formatted strings into a single input and then retrieving it from data as an array

  Parsing array formatted string as an actual array
  e.g. 
  - set like this {% set _myArray = ["1,2","3","4"] %} <input name="myInputForArray" type="hidden" value='{{_myArray|dump}}' >
  - retrieve like this {{data['myInputForArray']|toArray}}
  ------------------------------------------------------------------ */
  //commented out for now as not used yet
  // filters.toArray = function (array) {
  //   let _newArray = JSON.parse(array);
  //   return _newArray;
  // }



  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
}
