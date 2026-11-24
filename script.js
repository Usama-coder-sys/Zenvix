(function () {
  'use strict';

  var STORAGE_KEY = 'zenvix-reviews-v1';

  // Approved reviews that every visitor sees. Add one object per client:
  // { name: 'Client name', business: 'Business name, city', text: 'Their review.' }
  var FEATURED_REVIEWS = [];

  var list = document.getElementById('reviews-list');
  var empty = document.getElementById('reviews-empty');
  var form = document.getElementById('review-form');
  var msg = document.getElementById('review-msg');
  var nameInput = document.getElementById('rv-name');
  var bizInput = document.getElementById('rv-business');
  var textInput = document.getElementById('rv-text');
  if (!list || !empty || !form || !msg || !nameInput || !bizInput || !textInput) return;

  function loadLocal() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveLocal(items) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clean(value, max) {
    return String(value == null ? '' : value).trim().slice(0, max);
  }

  function setMessage(text, ok) {
    msg.textContent = text;
    msg.style.color = ok ? '#0B6B42' : '#B42318';
  }

  function buildCard(item, index, removable) {
    var fig = document.createElement('figure');
    fig.className = 'review-card';

    var quote = document.createElement('blockquote');
    quote.textContent = item.text;
    fig.appendChild(quote);

    var cap = document.createElement('figcaption');
    var name = document.createElement('span');
    name.className = 'review-name';
    name.textContent = item.name;
    cap.appendChild(name);
    if (item.business) {
      var biz = document.createElement('span');
      biz.className = 'review-biz';
      biz.textContent = item.business;
      cap.appendChild(biz);
    }
    fig.appendChild(cap);

    if (removable) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'review-remove';
      btn.textContent = 'Remove';
      btn.setAttribute('aria-label', 'Remove review by ' + item.name);
      btn.addEventListener('click', function () {
        var local = loadLocal();
        local.splice(index, 1);
        saveLocal(local);
        render();
        setMessage('Review removed.', true);
      });
      fig.appendChild(btn);
    }
    return fig;
  }

  function render() {
    var local = loadLocal();
    list.textContent = '';
    FEATURED_REVIEWS.forEach(function (item) {
      list.appendChild(buildCard(item, -1, false));
    });
    local.forEach(function (item, index) {
      list.appendChild(buildCard(item, index, true));
    });
    var total = FEATURED_REVIEWS.length + local.length;
    empty.hidden = total > 0;
    list.hidden = total === 0;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = clean(nameInput.value, 60);
    var business = clean(bizInput.value, 80);
    var text = clean(textInput.value, 600);

    if (!name) {
      setMessage('Please enter your name.', false);
      nameInput.focus();
      return;
    }
    if (text.length < 10) {
      setMessage('Please write at least 10 characters in your review.', false);
      textInput.focus();
      return;
    }

    var local = loadLocal();
    local.push({ name: name, business: business, text: text, date: new Date().toISOString() });
    local = local.slice(-50);

    if (!saveLocal(local)) {
      setMessage('Your review could not be saved. Your browser may be blocking storage.', false);
      return;
    }
    render();
    form.reset();
    setMessage('Thank you. Your review is saved on this device.', true);
  });

  render();
})();
