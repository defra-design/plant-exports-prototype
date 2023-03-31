

/**********
 * CONFIG (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

	// When user wants to view PHEATS designs hide all PHES related options 
	$("#service").change(function () {

		var serviceChoice = $('input[name="service"]:checked').val();
		console.log("serviceChoice is: " + serviceChoice);

		if (serviceChoice == "PHEATS~pheats/start-page") {
			$("#phesOptions").hide();
			$("#phesOptions").addClass("hidden");
			$("#phesOptions").attr("aria-hidden", true);
			$("#phesOptions").attr("hidden");
		}
		else {
			$("#phesOptions").show();
			$("#phesOptions").removeClass("hidden");
			$("#phesOptions").attr("aria-hidden", false);
			$("#phesOptions").removeAttr("hidden");
		}
	
	});

});
// jQuery (END)

// JavaScript (START)

// JavaScript (END)