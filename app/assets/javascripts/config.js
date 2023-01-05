

/**********
 * CONFIG (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

	// User selects the 'First time, no application' radio choice (under 'What user journey do you want to start with?')
	$("#route_new").change(function () {

		if ($("#route_new").is(":checked")) {
			// Choose the next most used starting place
			$("#start_page_start").click();
			// DISABLE the 'Dashboard' radio option
			$("#start_page_dashboard").attr("aria-disabled", true);
			$("#start_page_dashboard").attr("disabled", "disabled");
		}
		else {
			// Do nothing
		}

	});

	// User selects the 'Returning user, has multiple applications' radio choice (under 'What user journey do you want to start with?')
	$("#route_returning").change(function () {

		if ($("#route_returning").is(":checked")) {
			// ENABLE the 'Dashboard' radio option
			$("#start_page_dashboard").attr("aria-disabled", false);
			$("#start_page_dashboard").attr("disabled", false);
			// Revert back to the most used starting place
			$("#start_page_dashboard").click();
		}
		else {
			// Do nothing
		}

	});

});
// jQuery (END)

// JavaScript (START)

// JavaScript (END)