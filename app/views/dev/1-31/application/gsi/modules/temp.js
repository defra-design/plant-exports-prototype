function () {
  "use strict"; function n(e) {
    this.state = !1,
    this.previousState = !1,
    this.resultCache = {},
    this.$form = e.$form,
    this.$searchSubmitButton = this.$form.find(".gem-c-search__submit"),
    this.$resultsWrapper = this.$form.find(".js-live-search-results-block"),
    this.$suggestionsBlock = this.$form.find("#js-spelling-suggestions"),
    this.$resultsBlock = e.$results.find("#js-results"),
    this.$countBlock = e.$results.find("#js-result-count"),
    this.$mobileResultsCount = this.$form.find(".js-result-count"),
    this.$selectedFilterCount = this.$form.find(".js-selected-filter-count"),
    this.$facetTagBlock = e.$results.find("#js-facet-tag-wrapper"),
    this.$mobileFacetTagBlock = this.$form.find(".js-mobile-facet-tag-block"),
    this.$loadingBlock = e.$results.find("#js-loading-message"),
    this.$sortBlock = e.$results.find("#js-sort-options"),
    this.$paginationBlock = e.$results.find("#js-pagination"),
    this.action = this.$form.attr("action") + ".json",
    this.$atomAutodiscoveryLink = e.$atomAutodiscoveryLink,
    this.baseTitle = $("meta[name='govuk:base_title']").attr("content") || document.title,
    this.$resultsCountMetaTag = $("meta[name='govuk:search-result-count']"),
    this.$emailLink = $('a[href*="email-signup"]'),
    this.previousSearchTerm = "",
    this.emailSignupHref = this.$emailLink.attr("href"),
    this.$atomLink = $('a[href*=".atom"]'),
    this.atomHref = this.$atomLink.attr("href"),
    this.bindSortElements(),
    this.getTaxonomyFacet().update(),
    window.ga && window.ga("set",
      "transport",
      "beacon"),
    this.focusErrorMessagesOnLoad(this.$form),
    this.$searchSubmitButton.on("click",
      function (e) {
        e.preventDefault(),
        this.formChange(e)
      }.bind(this)),
    i.support.history() ? (this.saveState(),
      this.$form.on("change",
        "input[type=checkbox], input[type = radio], select",
function (e) { this.formChange(e) }.bind(this)),
      this.$form.on("customFormChange",
        this.$form,
        function (e) { this.formChange(e) }.bind(this)),
      this.$form.on("change keypress",
        "input[type=text],input[type=search]",
        function (e) {
          var t = 13; e.keyCode !== t && "change" !== e.type || (e.currentTarget.value === this.previousSearchTerm || e.suppressAnalytics || n.prototype.fireTextAnalyticsEvent(e),
            this.formChange(e),
            this.previousSearchTerm = e.currentTarget.value,
            e.preventDefault())
        }.bind(this)),
      this.indexTrackingData(),
      $(window).on("popstate",
        this.popState.bind(this))) : this.$form.find(".js-live-search-fallback").show()
  } window.GOVUK = window.GOVUK || {}; var i = window.GOVUK; n.prototype.startEnhancedEcommerceTracking = function e() {
    this.$resultsWrapper.attr("data-search-query",
      this.currentKeywords()),
    this.$suggestionsBlock.attr("data-search-query",
      this.currentKeywords()),
    i.Ecommerce && i.Ecommerce.start()
  },
    n.prototype.getTaxonomyFacet = function t() {
      return this.taxonomy = this.taxonomy || new i.TaxonomySelect({ $el: $(".js-taxonomy-select") }),
        this.taxonomy
    },
    n.prototype.getSerializeForm = function o() { return this.$form.serializeArray().filter(function (e) { return "" !== e.value && "option-select-filter" !== e.name }) },
    n.prototype.saveState = function r(e) {
      void 0 === e && (e = this.getSerializeForm()),
      this.previousState = this.state,
      this.state = e
    },
    n.prototype.popState = function a(e) {
      e.originalEvent.state && (this.saveState(e.originalEvent.state),
        this.updateOrder(),
        this.updateResults(),
        this.restoreBooleans(),
        this.restoreTextInputs())
    },
    n.prototype.formChange = function s() {
      this.isNewState() && (this.getTaxonomyFacet().update(),
        this.saveState(),
        this.updateOrder(),
        this.updateLinks(),
        this.updateTitle(),
        this.updateResults().done(function () {
          var e = window.location.pathname + "?" + $.param(this.state); window.history.pushState(this.state,
            "",
            e),
            this.trackingInit(),
            this.setRelevantResultCustomDimension(),
            this.trackPageView()
        }.bind(this)))
    },
    n.prototype.setRelevantResultCustomDimension = function c() {
      var e = $(".js-finder-results").find(".gem-c-document-list__item--highlight").length ? "yes" : "no"; i.SearchAnalytics.setDimension(83,
        e)
    },
    n.prototype.trackingInit = function l() {
      i.modules.start($(this.$resultsWrapper)),
      this.indexTrackingData(),
      this.startEnhancedEcommerceTracking()
    },
    n.prototype.trackPageView = function u() {
      var e = window.location.pathname + "?" + $.param(this.state); i.SearchAnalytics.trackPageview(e),
        i.SearchAnalytics.trackPageview(e,
          document.title,
          { trackerName: "govuk" })
    },
    n.prototype.trackSpellingSuggestionsImpressions = function d() {
      var e = $("meta[name='govuk:spelling-suggestion']"),
      t = 0 < this.$suggestionsBlock.find("a").length ? this.$suggestionsBlock.find("a").data("track-options").dimension81 : ""; e.attr("content",
        t)
    },
    n.prototype.indexTrackingData = function p() {
      var e = $(".filtered-results__group"); 0 < e.length && e.each(function (o) {
        $(this).find(".gem-c-document-list__item").each(function (e) {
          var t = $(this).find(".gem-c-document-list__item-title"),
          n = t.attr("data-track-action"); n = [n = n.replace(/\.\d+$/,
            ""),
          o + 1,
          e + 1].join("."),
            t.attr("data-track-action",
              n)
        })
      }); var t = $(".js-finder-results"); if (0 < t.length) {
        var n = t.find(".gem-c-document-list__item--highlight"); if (1 === n.length) {
          var o = n.attr("data-track-action"); o += "r",
            n.attr("data-track-action",
              o)
        }
      }
    },
    n.prototype.fireTextAnalyticsEvent = function f(e) {
      var t = {
        transport: "beacon",
        label: $(e.target)[0].value
      },
      n = "filterClicked",
      o = $('label[for="' + e.target.id + '"]')[0].innerText; i.SearchAnalytics.trackEvent(n,
        o,
        t)
    },
    n.prototype.cache = function h(e,
      t) { if (void 0 === t) return this.resultCache[e]; this.resultCache[e] = t },
    n.prototype.isNewState = function m() { return $.param(this.state) !== $.param(this.getSerializeForm()) },
    n.prototype.updateTitle = function g() {
      var e = this.currentKeywords(),
      t = "" !== e; document.title = t ? e + " - " + this.baseTitle : this.baseTitle
    },
    n.prototype.updateResultsCountMeta = function y(e) {
      this.$resultsCountMetaTag.attr("content",
        e)
    },
    n.prototype.updateSortOptions = function v(e,
      t) {
        t === $.param(this.state) && (this.updateElement(this.$sortBlock,
          e.sort_options_markup),
          this.bindSortElements())
    },
    n.prototype.bindSortElements = function b() {
      this.$orderSelect = this.$form.find(".js-order-results"),
      this.$relevanceOrderOption = this.$orderSelect.find("option[value=" + this.$orderSelect.data("relevance-sort-option") + "]"),
      this.$relevanceOrderOptionIndex = this.$relevanceOrderOption.index()
    },
    n.prototype.currentKeywords = function w() {
      return this.getTextInputValue("keywords",
        this.state)
    },
    n.prototype.updateOrder = function E() {
      if (this.$orderSelect.length) {
        var e = "" !== this.currentKeywords(),
        t = "" !== this.getTextInputValue("keywords",
          this.previousState),
        n = !e && t; e && !t && this.selectRelevanceSortOption(),
          n && this.selectDefaultSortOption()
      }
    },
    n.prototype.selectDefaultSortOption = function x() {
      var e = this.$orderSelect.data("default-sort-option"); this.$orderSelect.val(e),
        this.state = this.getSerializeForm()
    },
    n.prototype.selectRelevanceSortOption = function k() {
      var e = this.$orderSelect.data("relevance-sort-option"); e && (this.$relevanceOrderOption.removeAttr("disabled"),
        this.$orderSelect.val(e),
        this.state = this.getSerializeForm())
    },
    n.prototype.updateResults = function T() {
      var e = $.param(this.state),
      t = this.cache(e),
      n = this; return void 0 === t ? (this.showLoadingIndicator(),
        $.ajax({
          url: this.action,
          data: this.state,
          searchState: e
        }).done(function (e) {
          n.cache($.param(n.state),
            e),
          n.displayResults(e,
            this.searchState)
        }).error(function () { n.showErrorIndicator() })) : (this.displayResults(t,
          e),
          (new $.Deferred).resolve())
    },
    n.prototype.updateLinks = function C() {
      var e = "?" + $.param(this.state); "undefined" != typeof this.emailSignupHref && null != this.emailSignupHref && this.$emailLink.attr("href",
        this.emailSignupHref.split("?")[0] + e),
        "undefined" != typeof this.atomHref && null != this.atomHref && (this.$atomLink.attr("href",
          this.atomHref.split("?")[0] + e),
          this.$atomAutodiscoveryLink.attr("href",
            this.atomHref.split("?")[0] + e))
    },
    n.prototype.showLoadingIndicator = function L() { this.$loadingBlock.text("Loading...").show() },
    n.prototype.showErrorIndicator = function S() { this.$loadingBlock.text("Error. Please try modifying your search and trying again.") },
    n.prototype.updateElement = function j(e,
      t) { e.html(t) },
    n.prototype.displayResults = function O(e,
      t) {
        t === $.param(this.state) && (this.updateElement(this.$resultsBlock,
          e.search_results),
          this.updateElement(this.$facetTagBlock,
            e.facet_tags),
          this.updateElement(this.$countBlock,
            e.display_total),
          this.updateElement(this.$mobileResultsCount,
            e.display_total),
          this.updateElement(this.$mobileFacetTagBlock,
            e.facet_tags),
          this.updateElement(this.$selectedFilterCount,
            e.display_selected_facets_count),
          this.updateElement(this.$paginationBlock,
            e.next_and_prev_links),
          this.updateElement(this.$suggestionsBlock,
            e.suggestions),
          this.trackSpellingSuggestionsImpressions(e.suggestions),
          this.updateSortOptions(e,
            t),
          this.updateResultsCountMeta(e.total),
          this.manipulateErrorMessages(e.errors),
          this.$atomAutodiscoveryLink.attr("href",
            e.atom_url),
          this.$loadingBlock.text("").hide())
    },
    n.prototype.restoreBooleans = function A() {
      var o = this; this.$form.find("input[type=checkbox],input[type = radio]").each(function (e,
t) {
        var n = $(t); n.prop("checked",
          o.isBooleanSelected(n.attr("name"),
            n.attr("value")))
      })
    },
    n.prototype.isBooleanSelected = function _(e,
      t) {
        var n,
        o; for (n = 0,
          o = this.state.length; n < o; n++)if (this.state[n].name === e && this.state[n].value === t) return !0; return !1
    },
    n.prototype.restoreTextInputs = function N() {
      var o = this; this.$form.find("input[type=text], input[type = search], select").each(function (e,
t) {
        var n = $(t); n.val(o.getTextInputValue(n.attr("name"),
          o.state))
      })
    },
    n.prototype.getTextInputValue = function D(e,
      t) {
        var n,
        o; for (n = 0,
          o = t.length; n < o; n++)if (t[n].name === e) return t[n].value; return ""
    },
    n.prototype.focusErrorMessagesOnLoad = function (e) { var t = e.find("input[class*=--error]"); t.length && t.focus() },
    n.prototype.manipulateErrorMessages = function (e) {
      if (e) for (var t in e) {
        var n = t; for (var o in e[t]) {
          e[t][o] ? this.renderErrorMessage(n,
            o) : this.removeErrorMessage(n,
              o)
        }
      }
    },
    n.prototype.renderErrorMessage = function (e,
      t) {
        var n = this.$form.find('input[name*="' + e + "[" + t + ']"]'),
        o = $("<span />",
          {
            id: "error-" + e,
            "class": "gem-c-error-message govuk-error-message",
            html: '<span class="govuk-visually-hidden">Error:</span> Enter a real date'
          }); 0 === n.siblings(".gem-c-error-message").length && (n.addClass("govuk-input--error"),
            n.before(o),
            n.parent(".govuk-form-group").addClass("govuk-form-group--error"),
            n.attr("aria-describedby",
              n.attr("aria-describedby") + " " + o.attr("id"))),
            n.focus()
    },
    n.prototype.removeErrorMessage = function (e,
      t) {
        var n = this.$form.find('input[name*="' + e + "[" + t + ']"]'); 0 < n.siblings(".gem-c-error-message").length && (n.removeClass("govuk-input--error"),
          n.siblings(".gem-c-error-message").remove(),
          n.parent(".govuk-form-group").removeClass("govuk-form-group--error"),
          n.attr("aria-describedby",
            ""))
    },
    i.LiveSearch = n
} (),
  function (e,
    t) {
      "use strict"; function n() { return !!t.analytics } window.GOVUK = window.GOVUK || {},
        t.SearchAnalytics = {
          trackEvent: function o() {
            if (n() && t.analytics.trackEvent) return t.analytics.trackEvent.apply(t,
              arguments)
          },
          trackPageview: function i() {
            if (n() && t.analytics.trackPageview) return t.analytics.trackPageview.apply(t,
              arguments)
          },
          setDimension: function r() {
            if (n() && t.analytics.setDimension) return t.analytics.setDimension.apply(t,
              arguments)
          }
        }
  }(window,
    window.GOVUK),
  function (n) {
    "use strict"; function e(e) {
      this.$el = e.$el,
      this.options = this.instantiateOptions()
    } window.GOVUK = window.GOVUK || {}; var t = window.GOVUK; e.prototype.update = function o() {
      this.disableSubTaxonFacet(),
      this.resetSubTaxonValue(),
      this.showRelevantSubTaxons()
    },
      e.prototype.$topLevelTaxon = function i() { return this.$el.find("#level_one_taxon") },
      e.prototype.$subTaxon = function r() { return this.$el.find("#level_two_taxon") },
      e.prototype.disableSubTaxonFacet = function a() {
        var e = !!this.$topLevelTaxon().val(); this.$subTaxon().attr("disabled",
          !e)
      },
      e.prototype.showRelevantSubTaxons = function s() {
        var e = this.options[this.$topLevelTaxon().val()],
        t = this.$subTaxon(); t.find("option").each(function () { n(this).val() && n(this).remove() }),
          t.append(e)
      },
      e.prototype.instantiateOptions = function c() {
        var t = {}; return this.$subTaxon().find("option").each(function () {
          var e = n(this).attr("data-topic-parent"); t[e] = t[e] || [],
            t[e].push(this)
        }),
          t
      },
      e.prototype.resetSubTaxonValue = function l() {
        var e = this.$subTaxon().find(":selected"),
        t = this.$topLevelTaxon().val(); e && e.attr("data-topic-parent") !== t && this.$subTaxon().val("")
      },
      t.TaxonomySelect = e
  }(jQuery),
  window.GOVUK = window.GOVUK || {},
  window.GOVUK.Modules = window.GOVUK.Modules || {},
  function () {
    "use strict"; window.GOVUK.Modules.EnableAriaControls = function e() {
      this.start = function (e) {
        function t() {
          var e = $(this).data("aria-controls"); "string" == typeof e && 0 < $("#" + e).length && $(this).attr("aria-controls",
            e)
        } e.find("[data-aria-controls]").each(t)
      }
    }
  }(),
  window.GOVUK = window.GOVUK || {},
  window.GOVUK.Modules = window.GOVUK.Modules || {},
  function (e) {
    function t() { } t.prototype.start = function (e) {
      this.$module = e[0],
      this.$facetsBox = this.$module.querySelector(".facets__box"),
      this.$closeTriggers = this.$module.querySelectorAll(".js-close-filters"),
      this.$showResultsButton = this.$module.querySelector(".js-show-results"),
      this.$clearFiltersTrigger = this.$module.querySelector(".js-clear-selected-filters"),
      this.$body = document.querySelector("body"),
      this.$module.open = this.handleOpen.bind(this),
      this.$module.close = this.handleClose.bind(this),
      this.$module.clearFilters = this.handleClearFilters.bind(this),
      this.$module.ModalFocus = this.handleModalFocus.bind(this),
      this.$module.boundKeyDown = this.handleKeyDown.bind(this); var t = document.querySelector('[data-toggle="mobile-filters-modal"][data-target="' + this.$module.id + '"]'); if (t && t.addEventListener("click",
        this.$module.open),
        this.$closeTriggers) for (var n = 0; n < this.$closeTriggers.length; n++)this.$closeTriggers[n].addEventListener("click",
          this.$module.close); this.$clearFiltersTrigger && this.$clearFiltersTrigger.addEventListener("click",
            this.$module.clearFilters)
    },
      t.prototype.handleOpen = function (e) {
        e && e.preventDefault(),
        this.$body.style.top = "-" + window.scrollY + "px",
        this.$body.style.position = "fixed",
        this.$focusedElementBeforeOpen = document.activeElement,
        this.$module.style.display = "block",
        this.$facetsBox.setAttribute("aria-modal",
          !0),
        this.$facetsBox.setAttribute("tabindex",
          0),
        this.$facetsBox.focus(),
        document.addEventListener("keydown",
          this.$module.boundKeyDown,
          !0)
      },
      t.prototype.handleClose = function (e) {
        e && e.preventDefault(); var t = this.$body.style.top; this.$body.style.position = "",
          this.$body.style.top = "",
          window.scrollTo(0,
            -1 * parseInt(t || "0")),
          this.$module.style.display = "none",
          this.$facetsBox.removeAttribute("aria-modal"),
          this.$facetsBox.removeAttribute("tabindex"),
          this.$focusedElementBeforeOpen.focus(),
          document.removeEventListener("keydown",
            this.$module.boundKeyDown,
            !0)
      },
      t.prototype.handleModalFocus = function () { this.$facetsBox.focus() },
      t.prototype.handleKeyDown = function (e) {
        var t = 9,
        n = 27; switch (e.keyCode) {
          case t: e.shiftKey ? document.activeElement === this.$facetsBox && (e.preventDefault(),
            this.$showResultsButton.focus()) : document.activeElement === this.$showResultsButton && (e.preventDefault(),
              this.$facetsBox.focus()); break; case n: this.$module.close()
        }
      },
      t.prototype.handleClearFilters = function (e) {
        e && e.preventDefault(); var t = this.$module.querySelectorAll("input, select, .js - selected - counter"),
        n = document.querySelector(".js-live-search-form"),
          o = document.createEvent("HTMLEvents"); o.initEvent("customFormChange",
            !0,
            !1); for (var i = 0; i < t.length; i++) { var r = t[i]; switch (r.tagName) { case "INPUT": "checkbox" === r.type && !0 === r.checked ? r.checked = !1 : "text" === r.type && "" !== r.value && (r.value = ""); break; case "SELECT": r.value = ""; break; case "DIV": r.parentNode.removeChild(r) } } n.dispatchEvent(o)
      },
      e.MobileFiltersModal = t
  }(window.GOVUK.Modules),
  window.GOVUK = window.GOVUK || {},
  window.GOVUK.Modules = window.GOVUK.Modules || {},
  function (e,
    r) {
      "use strict"; r.Modules.RemoveFilter = function n() {
        function t(e) {
          e.preventDefault(),
          e.stopPropagation(); var t = $(e.target),
            n = t.data("name"),
            o = t.data("value"),
            i = t.data("track-label"),
            r = t.data("facet"),
            a = c(n, o, r); l(i, r), s(a, o,  r)
        } function s(e,
          t,
          n) {
            var o = e.prop("tagName"),
            i = e.prop("type"),
            r = e.val(); if ("checkbox" === i) e.prop("checked",
              !1),
              e.trigger(d); else if ("text" === i || "search" === i) {
                var a = " " + r.trim() + " ",
                s = " " + u(t.toString()) + " ",
                c = a.replace(s,
                  " ").replace(/ {2}/g,
                    " ").trim(); e.val(c).trigger(d)
              } else "OPTION" === o && $("#" + n).val("").trigger(d)
        } function c(e,
          t,
          n) { var o = e ? " input[name='" + e + "']" : " [value='" + t + "']"; return $("#" + n).find(o) } function l(e,
            t) {
              var n = "facetTagRemoved",
              o = t,
              i = e; r.SearchAnalytics.trackEvent(n,
                o,
                { label: i }),
                r.SearchAnalytics.trackEvent(n,
                  o,
                  {
                    label: i,
                    trackerName: "govuk"
                  })
        } function u(e) {
          return e.replace(/&quot;/g, '"')
        } var d = {
          type: "change",
          suppressAnalytics: !0
        }; this.start = function (e) {
          $(e).on("click",
            '[data-module="remove-filter-link"]',
            t)
        }
      }
  }(window,
    window.GOVUK),
  window.GOVUK = window.GOVUK || {},
  window.GOVUK.Modules = window.GOVUK.Modules || {},
  function (e,
    s) {
      "use strict"; var c = e.jQuery; s.Modules.TrackBrexitQaChoices = function () {
        function t(e) {
          e.on("submit",
            function (e) {
              var n,
              o,
              i,
              r = c(e.target),
              t = r.find("input:checked"),
              a = r.data("question-key"); t.length ? t.each(function () {
                var e = (n = c(this)).attr("id"),
                t = r.find('label[for="' + e + '"]').text().trim(); o = t.length ? t : n.val(),
                  i = {
                    transport: "beacon",
                    label: o
                  },
                  s.SearchAnalytics.trackEvent("brexit-checker-qa",
                    a,
                    i)
              }) : (i = {
                transport: "beacon",
                label: "no choice"
              },
                s.SearchAnalytics.trackEvent("brexit-checker-qa",
                  a,
                  i))
            })
        }
