

/**********
 * COOKIES (JavaScript)
 * **********/

// jQuery (START)
$(document).ready(function () {
  
  // HIDE all non JavaScript content
  $("#nonJSContent").hide();
  $("#nonJSContent").addClass("hidden");
  $("#nonJSContent").attr("aria-hidden", true);
  $("#nonJSContent").attr("hidden");

  // SHOW all JavaScript content hidden by default (progressive enhancement)
  $("#JSContent").show();
  $("#JSContent").removeClass("hidden");
  $("#JSContent").attr("aria-hidden", false);
  $("#JSContent").removeAttr("hidden");

  // Handling of the COOKIE BANNER
  // User accepts all cookies
  $("#acceptButton").click(function () {

    // HIDE the cookie question banner
    $("#questionBanner").hide();
    $("#questionBanner").addClass("hidden");
    $("#questionBanner").attr("aria-hidden", true);
    $("#questionBanner").attr("hidden");

    // SHOW the accepted cookie banner (with focus plus a tabindex of -1)
    $("#acceptedBanner").show();
    $("#acceptedBanner").removeClass("hidden");
    $("#acceptedBanner").attr("aria-hidden", false);
    $("#acceptedBanner").removeAttr("hidden");
    $("#acceptedBanner").attr("tabindex", "-1");
    $("#acceptedBanner").focus();

    // Update the cookie on the client
    $.cookie('seen_cookie_message', 'Accepted', { expires: 28, path: '/' });

  });

  // User rejects all cookies
  $("#rejectButton").click(function () {

    // HIDE the cookie question banner
    $("#questionBanner").hide();
    $("#questionBanner").addClass("hidden");
    $("#questionBanner").attr("aria-hidden", true);
    $("#questionBanner").attr("hidden");

    // SHOW the rejected cookie banner (with focus plus a tabindex of -1)
    $("#rejectedBanner").show();
    $("#rejectedBanner").removeClass("hidden");
    $("#rejectedBanner").attr("aria-hidden", false);
    $("#rejectedBanner").removeAttr("hidden");
    $("#rejectedBanner").attr("tabindex", "-1");
    $("#rejectedBanner").focus();

    // Update the cookie on the client
    $.cookie('seen_cookie_message', 'Rejected', { expires: 28, path: '/' });

  });

  // Hide cookie banner after choice
  $("#hideButton").click(function () {

    // HIDE all cookie banners
    $(".govuk-cookie-banner").hide();
    $(".govuk-cookie-banner").addClass("hidden");
    $(".govuk-cookie-banner").attr("aria-hidden", true);
    $(".govuk-cookie-banner").attr("hidden");

    // Update the cookie on the client
    $.cookie('seen_cookie_message', 'Hidden', { expires: 28, path: '/' });

  });

  // Handling of the COOKIES PAGE
  $("#cookiePageButton").click(function () {

    var userCookieChoice = $('input[name="analytics"]:checked').val();

    if (userCookieChoice == "Yes") {
      
      // SHOW the success banner (with a tabindex of -1) for updating cookie settings
      $(".js-cookies-page-success").show();
      $(".js-cookies-page-success").removeClass("hidden");
      $(".js-cookies-page-success").attr("aria-hidden", false);
      $(".js-cookies-page-success").removeAttr("hidden");
      $(".js-cookies-page-success").attr("tabindex", "-1");
      $(".js-cookies-page-success").focus();

      // Update the cookie on the client
      $.cookie('seen_cookie_message', 'Accepted', { expires: 28, path: '/' });

    }
    else if (userCookieChoice == "No") {
      
      // SHOW the success banner (with focus plus a tabindex of -1) for updating cookie settings
      $(".js-cookies-page-success").show();
      $(".js-cookies-page-success").removeClass("hidden");
      $(".js-cookies-page-success").attr("aria-hidden", false);
      $(".js-cookies-page-success").removeAttr("hidden");
      $(".js-cookies-page-success").attr("tabindex", "-1");
      $(".js-cookies-page-success").focus();

      // Update the cookie on the client
      $.cookie('seen_cookie_message', 'Rejected', { expires: 28, path: '/' });

    }
    else {

      // Reset the success banner
      $(".js-cookies-page-success").hide();
      $(".js-cookies-page-success").addClass("hidden");
      $(".js-cookies-page-success").attr("aria-hidden", true);
      $(".js-cookies-page-success").attr("hidden");
      $(".js-cookies-page-success").removeAttr("tabindex");

    }

  });

});
// jQuery (END)