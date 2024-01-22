module.exports = function(env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

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


  // Data sources (located in the 'app/data' root folder)
  var applications = require('./data/applications.json');
  var applicationsv2 = require('./data/applications-v2.json');;
  var applicationsv3 = require('./data/applications-v3.json');
  var applicationsv4 = require('./data/applications-v4.json');
  var applicationsv5 = require('./data/applications-v5.json');
  var applicationsv6 = require('./data/applications-v6.json');
  var applicationsv7 = require('./data/applications-v7.json');
  var applicationsv8 = require('./data/applications-v8.json');
  var sample = require('./data/sample.json');
  const e = require('express');


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

  // Get application information (v8)
  // Prototype version 3-1 onward
  filters.appInformationV8 = function (id, key) {
    
    var app = {};
    
    applicationsv8.forEach(function (item) {
      
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


  //filter for month implment on the page by using "| toMonth"
  filters.toMonth = function(x) {
    months = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];
    if (x > 0) {
      return months[x - 1]; // returns date as per month
    } else {
      return x;
    }
  }

  //get today's date change any string in to today's date {{ "foo" | today }}
  filters.today = function(x) {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    //change the month into a name
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    mm = monthNames[mm - 1]

    const today = `${dd} ${mm} ${yyyy}`;

    return x.replace(/\w+/g, today)
  }

  //filter for removing white space from a variable "| replaceWS"
  filters.replaceWS = function(e) {
    return e.replace(/\s/g, '')
  }

  //capitalise the first character of a string "| firstToUpperCase"
  filters.firstToUpperCase = function(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
  }

  //filter for replacing commas with line breaks "| replaceComma | striptags(true) | escape | nl2br"
  filters.replaceComma = function(e) {
    return e.replace(/\,/g, '\n')
  }

  //filter for replacing brackets with line breaks "| stripSqBrackets "
  filters.stripSqBrackets = function(e) {
    return e.replace(/\[|\]/g, "")
  }

  //filter for replacing quotes with line breaks "| stripQuotes "
  filters.stripQuotes = function(e) {
    return e.replace(/\"/g, "")
  }

  //filter for replacing tildes with line breaks "| replaceTilde | striptags(true) | escape | nl2br"
  filters.replaceTilde = function(e) {
    return e.replace(/\~/g, '\n')
  }

  //filter for removing nulls "|removeNull"
  filters.removeNull = function(e) {
    return e.replace(/null/g, '')
  }


  //set colours for status "| tagColour"
  filters.tagColour = function(e) {
    if (e == "Inactive") {
      return "govuk-tag--grey"
    } else if (e == "New") {
      return "govuk-tag--green"
    } else if (e == "Active") {
      return "govuk-tag--turquoise"
    } else if (e == "Pending") {
      return "govuk-tag--blue"
    } else if (e == "Received") {
      return "govuk-tag--purple"
    } else if (e == "Sent") {
      return "govuk-tag--pink"
    } else if (e == "Rejected") {
      return "govuk-tag--red"
    } else if (e == "Declined") {
      return "govuk-tag--orange"
    } else if (e == "Delayed") {
      return "govuk-tag--yellow"
    } else {
      return ""
    }
  }

  //set units to symbols"| symbols"
  filters.symbols = function(e) {
    if (e == "cubicMetresPerSecond") {
      return "m<sup>3</sup>/s"
    } else if (e == "cubicMetresPerDay") {
      return "m<sup>3</sup>/d"
    } else if (e == "litrespersecond") {
      return "l/s"
    } else if (e == "metresAboveOrdinanceDatum") {
      return "mAOD"
    } else if (e == "metresAboveStationDatum") {
      return "mASD"
    } else if (e == "metres") {
      return "m"
    } else {
      return "Ml/d"
    }
  }

  //set symbols to units "| units"
  filters.units = function(e) {
    if (e == "m") {
      return "metres"
    } else if (e == "kg") {
      return "kilograms"
    } else if (e == "m/s") {
      return "metre per second"
    } else if (e == "s") {
      return "second"
    } else {
      return ""
    }
  }


  //set currency abbreviations to symbols "| currencySymbols"
  filters.currencySymbols = function(e) {
    if (e == "GBP") {
      return "£"
    } else if (e == "JPY") {
      return "¥"
    } else if (e == "EUR") {
      return "€"
    } else if (e == "USD") {
      return "$"
    } else {
      return ""
    }
  }


  //filter to turn a string in to a comma separated string prepended by the £ symbol "| toGBPString"
    filters.toGBP = function(x) {
      return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace (/^/,'£');
    }


  //push items in to an array to be used in a nunjucks macro "| push"
  /* e.g
          {% set selectItems = [] %}
          {% for item in selectData %}
              {% set selectItems = selectItems | push({
                  value: item.value,
                  text: item.text
              }) %}
          {% endfor %}
          {{ govukSelect({
            id: "sort",
            name: "sort",
            label: {
              text: "Sort by"
              },
            items: items
          }) }}
          */
  filters.push = (array, item) => {
    array.push(item)
    return array
  }

  //filter to remove duplicates from an array " | unique"
  filters.unique = function(x) {
    //return x.filter((value, index) => x.indexOf(value) === index );
    return [...new Set(x)]
  }

  //filter remove the first item in an array " |shift"
  filters.shift = function(x) {
    return x.shift()
  }


  //Array to string on new lines, this uses in built filters and other filters in this file  "| dump | stripQuotes | stripSqBrackets | replaceComma | striptags(true) | escape | nl2br "




  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

  return filters
}
