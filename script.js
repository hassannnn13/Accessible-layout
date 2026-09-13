(function () {
  'use strict';

  var BASE_SERVINGS = 1;
  var MIN_SERVINGS = 1;
  var MAX_SERVINGS = 12;

  var input = document.getElementById('servings-input');
  var decreaseBtn = document.getElementById('decrease');
  var increaseBtn = document.getElementById('increase');
  var status = document.getElementById('servings-status');
  var amounts = Array.prototype.slice.call(
    document.querySelectorAll('.amount[data-base]')
  );

  var FRACTIONS = [
    { value: 0.25, glyph: '\u00BC' },
    { value: 0.5, glyph: '\u00BD' },
    { value: 0.75, glyph: '\u00BE' },
    { value: 0.333, glyph: '\u2153' },
    { value: 0.667, glyph: '\u2154' }
  ];

  function formatAmount(value, isCount) {
    if (isCount) {
      return String(Math.max(1, Math.round(value)));
    }

    var whole = Math.floor(value);
    var remainder = value - whole;
    var closestFraction = null;
    var closestDiff = 0.06; 
    FRACTIONS.forEach(function (fraction) {
      var diff = Math.abs(remainder - fraction.value);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestFraction = fraction;
      }
    });

    if (closestFraction) {
      return (whole > 0 ? String(whole) : '') + closestFraction.glyph;
    }

    var rounded = Math.round(value * 10) / 10;
    return rounded % 1 === 0 ? String(rounded) : String(rounded);
  }

  function pluralWord(unit, plural, amountValue) {
    if (!unit) {
      return '';
    }
    return amountValue > 1 && plural ? plural : unit;
  }

  function updateQuantities(servings) {
    var multiplier = servings / BASE_SERVINGS;

    amounts.forEach(function (el) {
      var base = parseFloat(el.getAttribute('data-base'));
      var isCount = el.getAttribute('data-count') === 'true';
      var unit = el.getAttribute('data-unit') || '';
      var plural = el.getAttribute('data-plural') || '';
      var scaled = base * multiplier;
      var displayNumber = formatAmount(scaled, isCount);
      var unitWord = pluralWord(unit, plural, scaled);

      el.textContent = unitWord ? displayNumber + ' ' + unitWord : displayNumber;
    });
  }

  function announce(servings) {
    status.textContent = 'Showing quantities for ' + servings + ' ' +
      (servings === 1 ? 'serving' : 'servings') + '.';
  }

  function clamp(value) {
    if (isNaN(value)) {
      return BASE_SERVINGS;
    }
    return Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, Math.round(value)));
  }

  function setServings(value, options) {
    var clamped = clamp(value);
    input.value = clamped;
    updateQuantities(clamped);
    announce(clamped);
    decreaseBtn.disabled = clamped <= MIN_SERVINGS;
    increaseBtn.disabled = clamped >= MAX_SERVINGS;
    return clamped;
  }

  decreaseBtn.addEventListener('click', function () {
    setServings(parseInt(input.value, 10) - 1);
    input.focus();
  });

  increaseBtn.addEventListener('click', function () {
    setServings(parseInt(input.value, 10) + 1);
    input.focus();
  });

  input.addEventListener('change', function () {
    setServings(parseInt(input.value, 10));
  });

  input.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      window.requestAnimationFrame(function () {
        setServings(parseInt(input.value, 10));
      });
    }
  });

  setServings(BASE_SERVINGS);
})();