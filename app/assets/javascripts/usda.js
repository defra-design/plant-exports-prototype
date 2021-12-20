$(document).ready(function () {

  // Change the default routing to divert users exporting bulbs to the US to a USDA pre clearance page
  $("#usda-wrapper").change(function () {

    // Get the user's choice
    var countryValue = $("#usda").val();

    if (countryValue == "United States") {
        // Divert users to USDA page
        $('#dynamicForm').attr('action', 'usda');
    }
    else {
        // Change or keep the default page
        $('#dynamicForm').attr('action', 'declaration');
    }
          
  });

});