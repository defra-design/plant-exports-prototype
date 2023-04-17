

/**********
 * CONFIG (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {

	// When user wants to view PHEATS designs hide all PHES related options 
	$("#service").change(function () {

		var serviceChoice = $('input[name="service"]:checked').val();

		// Show config options for ePhyto plus update sub heading to 'ePhyto'
		if (serviceChoice == "ePhyto") {
			$("#additionalConfigOptions").show();
			$("#additionalConfigOptions").removeClass("hidden");
			$("#additionalConfigOptions").attr("aria-hidden", false);
			$("#additionalConfigOptions").removeAttr("hidden");
			$(".govuk-caption-m").html("ePhyto");
		}
		// Show config options for PHES plus update sub heading to 'PHES'
		else if (serviceChoice == "PHES") {
			$("#additionalConfigOptions").show();
			$("#additionalConfigOptions").removeClass("hidden");
			$("#additionalConfigOptions").attr("aria-hidden", false);
			$("#additionalConfigOptions").removeAttr("hidden");
			$(".govuk-caption-m").html("PHES");
		}
		// Hide all config options (PHEATS)
		else {
			$("#additionalConfigOptions").hide();
			$("#additionalConfigOptions").addClass("hidden");
			$("#additionalConfigOptions").attr("aria-hidden", true);
			$("#additionalConfigOptions").attr("hidden");
		}
	
	});

});
// jQuery (END)

// JavaScript (START)

// JavaScript (END)