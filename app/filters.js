//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

//Import extraFilters from file
let extraFilters = require('./extra-filters')
//Call the extra filters function and assign output to filters var
let filters = extraFilters()
//Loop through object and run the addFilter API for each filter
Object.keys(filters).forEach(function (filterName) {
 addFilter(filterName, filters[filterName])
})
