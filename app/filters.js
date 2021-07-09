// There might be a better way to use this data.
var applications = require('./data/applications.json')
var sample = require('./data/sample.json')
module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}


  // get application information
  filters.appInfo = function (id, key) {
    var app = {};
    applications.forEach(function (item) {
      if (item.index == id) {
        app = item;
      }
    })

    return app[key];
  }

  // show hide infomation based on search results
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
      return months[x - 1]; // returns date as per month
    } else {
      return x;
    }
  }
  filters.toMoney = function (x) {
    return ("£" + x);
    //TO ADD - case to handle nothing being there
  }
  filters.getCommodity = function (str, val) {
    console.log("looking up commodity: " + val)
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(str);

    //matches[1] contains the value between the parentheses
    console.log(matches[1]);
    for (key in sample) {
      console.log("found " + sample[key].eppocode);
      if (sample[key].eppocode == matches[1]) {
        return sample[key][val];
      }
    }
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
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
