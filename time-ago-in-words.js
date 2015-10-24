/**
 * time-ago-in-words is a javascript plugin that turns date into words
 *
 * http://www.github.com/perich/time-ago-in-words
 *
 * @name time-ago-in-words
 * @author Peter Richards
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 */
(function(window, document, undefined){
  'use strict';

  var settings = {
    refreshMillis: 60000,
    allowPast: true,
    allowFuture: true,
    localeTitle: false,
    cutoff: 0,
    strings: {
      prefixAgo: null,
      prefixFromNow: null,
      suffixAgo: "ago",
      suffixFromNow: "from now",
      inPast: 'any moment now',
      seconds: "less than a minute",
      minute: "about a minute",
      minutes: "%d minutes",
      hour: "about an hour",
      hours: "about %d hours",
      day: "a day",
      days: "%d days",
      month: "about a month",
      months: "%d months",
      year: "about a year",
      years: "%d years",
      wordSeparator: " ",
      numbers: []
    }
  };
  // Recalculates all the times every minutes
  function startInterval () {
    setInterval(function timeChecker() {
      changeAll();
    }, 60000);
  }

  function changeOne (node) {
    var date = node.getAttribute("title");
    // this handles UTC numbers as strings
    if (/^\d+$/.test(date)) {
      date = parseInt(date);
    }
    var date = new Date(date).getTime(),
        now = Date.now(),
        words = inWords(now - date);
    // Returns if NaN. Remember NaN !== NaN
    if (date !== date) { return; }
    node.innerText = words;
  }

  function changeAll () {
    var list = document.querySelectorAll(settings.selector);
    for (var i = 0; i < list.length; i++) {
      changeOne(list[i]);
    }
  };

  function inWords (distanceMillis) {
    var settingStrings = settings.strings;
    var prefix = settingStrings.prefixAgo;
    var suffix = settingStrings.suffixAgo;
    if (settings.allowFuture) {
      if (distanceMillis < 0) {
        prefix = settingStrings.prefixFromNow;
        suffix = settingStrings.suffixFromNow;
      }
    };

    if(!settings.allowPast && distanceMillis >= 0) {
      return settings.strings.inPast;
    };

    var seconds = Math.abs(distanceMillis) / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    function substitute (stringOrFunction, number) {
      var string = (typeof stringOrFunction == "function") ? stringOrFunction(number, distanceMillis) : stringOrFunction;
      var value = (settingStrings.numbers && settingStrings.numbers[number]) || number;
      return string.replace(/%d/i, value);
    };

    var words = seconds < 45 && substitute(settingStrings.seconds, Math.round(seconds)) ||
      seconds < 90 && substitute(settingStrings.minute, 1) ||
      minutes < 45 && substitute(settingStrings.minutes, Math.round(minutes)) ||
      minutes < 90 && substitute(settingStrings.hour, 1) ||
      hours < 24 && substitute(settingStrings.hours, Math.round(hours)) ||
      hours < 42 && substitute(settingStrings.day, 1) ||
      days < 30 && substitute(settingStrings.days, Math.round(days)) ||
      days < 45 && substitute(settingStrings.month, 1) ||
      days < 365 && substitute(settingStrings.months, Math.round(days / 30)) ||
      years < 1.5 && substitute(settingStrings.year, 1) ||
      substitute(settingStrings.years, Math.round(years));

    var separator = settingStrings.wordSeparator || "";
    if (settingStrings.wordSeparator === undefined) { separator = " "; }
    return [prefix, words, suffix].join(separator).trim();
  };

  window.TimeAgo = function (sel) {
    settings.selector = sel || ".timeago";
    changeAll();
    startInterval();
  };

  // jQuery Timeago support
  if (typeof window.$ == "function") {
    $.fn.timeago = function () {
      TimeAgo();
    }
  };

})(this, document);