/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookingData": () => (/* binding */ bookingData),
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "returnData": () => (/* binding */ returnData)
/* harmony export */ });
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turks_beach_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_transparent_starfish_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_resort_room_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _classes_Hotel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);









const {
  checkAvailabilityBtn,
  checkRatesBtn,
  reservationBtn,
  rewardsBtn,
  loginForm,
  loginBtn,
  signInBtn,
  loginErrorMsg,
  beachImage,
  loginHolder,
  customerInfoDisplay,
  checkRatesDropDownDisplay,
  arrivalDate,
  departureDate,
  roomType,
  dateErrorArrival,
  dateErrorDeparture,
} = _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default;

let customerData, roomData, currentCustomer, hotel;
let bookingData = null;

window.addEventListener('load', returnData);
customerInfoDisplay.addEventListener('click', function (event) {
  if (event.target.className === 'book-now-button') {
    bookRoom(event);
  }
});
checkAvailabilityBtn.addEventListener('click', checkAvailability);
checkRatesBtn.addEventListener('click', renderBookingPage);
rewardsBtn.addEventListener('click', renderRewardsPage);
reservationBtn.addEventListener('click', renderReservationsPage);
signInBtn.addEventListener('click', renderSignInForm);
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  let inputId = username.substring(8);
  hotel.findCurrentCustomer(inputId);
  if (hotel.currentCustomer && password === 'overlook2021') {
    currentCustomer = hotel.currentCustomer;
    show(beachImage);
    hide(loginHolder);
    show(reservationBtn);
    show(rewardsBtn);
    show(checkRatesBtn);
  } else {
    loginErrorMsg.style.opacity = 1;
  }
});

function getData() {
  return Promise.all([
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_6__.fetchData)('customers'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_6__.fetchData)('rooms'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_6__.fetchData)('bookings'),
  ]);
}

function returnData() {
  getData()
    .then((promiseArray) => {
      customerData = promiseArray[0].customers;
      roomData = promiseArray[1].rooms;
      bookingData = promiseArray[2].bookings;
      instantiateData();
      setMinimumCalendarDate();
    })
    .catch((error) => displayErrorMessage(error, customerInfoDisplay));
  setMinimumCalendarDate();
}

function instantiateData() {
  let customers = customerData.map((customer) => {
    return new _classes_Customer__WEBPACK_IMPORTED_MODULE_4__.default(customer);
  });
  hotel = new _classes_Hotel__WEBPACK_IMPORTED_MODULE_5__.default(roomData, bookingData, customers);
}

function setMinimumCalendarDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('arrival').setAttribute('min', today);
}

function renderBookingPage() {
  show(customerInfoDisplay);
  show(checkRatesBtn);
  checkRatesDropDownDisplay.classList.add('show');
}

function renderSignInForm() {
  hide(signInBtn);
  hide(beachImage);
  show(loginHolder);
}

function renderReservationsPage() {
  checkRatesDropDownDisplay.classList.remove('show');
  show(customerInfoDisplay);
  customerInfoDisplay.innerHTML = '';
  hotel.returnCustomerBookings();
  hotel.currentCustomerBooking.forEach((booking) => {
    let reservedRoom = hotel.rooms.find((room) => {
      return room.number === booking.roomNumber;
    });
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableRoomCards(reservedRoom, booking);
  });
}

function renderRewardsPage() {
  checkRatesDropDownDisplay.classList.remove('show');
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableRewards(hotel);
  show(customerInfoDisplay);
}

function checkAvailability() {
  event.preventDefault();
  if (!arrivalDate.value) {
    hide(customerInfoDisplay);
    show(dateErrorArrival);
    checkRatesDropDownDisplay.classList.add('show');
  }
  if (!departureDate.value) {
    hide(customerInfoDisplay);
    show(dateErrorDeparture);
    checkRatesDropDownDisplay.classList.add('show');
  }
  if (departureDate.value && arrivalDate.value) {
    filterBookings();
  }
}

function filterBookings() {
  let arrivalDateInput = arrivalDate.value.split('-').join('/');
  let departureDateInput = departureDate.value.split('-').join('/');
  let selectedRoomType = roomType.value;
  roomData = hotel.returnAvailableRoomsByDate(
    arrivalDateInput,
    departureDateInput
  );
  roomData = hotel.filterRoomsByType(
    selectedRoomType,
    arrivalDateInput,
    departureDateInput
  );
  if (roomData.length > 0) {
    renderAvailableBookings();
  } else {
    console.log(roomType.value);
    show(customerInfoDisplay);
    checkRatesDropDownDisplay.classList.remove('show');
    customerInfoDisplay.innerHTML = '';
    customerInfoDisplay.innerHTML = `
    <h2> We're sorry, there are no ${roomType.value}'s available for the dates you have requested </h2>
    <h4> If your dates are flexible, please contact our Worldwide Reservations Office or speak to a hotel reservation agent at 1 (800) 201-9580</h4>
    `;
  }
}

function renderAvailableBookings() {
  show(customerInfoDisplay);
  checkRatesDropDownDisplay.classList.remove('show');
  customerInfoDisplay.innerHTML = '';
  roomData.forEach((room) => {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableBookingCards(room);
  });
}

function bookRoom(event) {
  event.preventDefault();
  hide(customerInfoDisplay);
  let bookingDate = arrivalDate.value.split('-').join('/');
  let bookingRoomNumber = Number(event.target.closest('section').id);
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_6__.addBooking)(bookingRoomNumber, currentCustomer.id, bookingDate)
    .then(hotel.returnCustomerBookings())
    .then(hotel.calculateCustomerBookingsTotals())
    .catch((error) => displayErrorMessage(error, customerInfoDisplay));
}

function displayErrorMessage(error, customerInfoDisplay) {
  show(customerInfoDisplay);
  customerInfoDisplay.innerHTML = `<h2> We are sorry, our server is currently on vacation. </h2>`;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Lato\", sans-serif;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  background-color: white;\n}\n\nheader {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  color: #003e93;\n}\n\n.title-container {\n  display: flex;\n  align-items: flex-end;\n  margin-bottom: 2%;\n}\n.title-container .title {\n  padding-left: 2%;\n  font-size: 3em;\n}\n\n.star-fish {\n  padding-left: 2%;\n  margin-top: 2%;\n}\n\n.sign-in-button {\n  margin-left: 62%;\n  margin-bottom: 4%;\n  background-color: white;\n  border: none;\n  font-size: 1.4em;\n  color: #003e93;\n}\n\n.sign-in-button:hover {\n  color: #209fdf;\n}\n\n.menu-buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin: 0;\n}\n\n.reservation-button,\n.yearly-expense-button {\n  color: #003e93;\n  border: none;\n  background-color: white;\n  font-size: 1.3em;\n  margin-left: 1%;\n  margin-right: 1%;\n}\n.reservation-button:hover,\n.yearly-expense-button:hover {\n  color: #209fdf;\n}\n\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.check-rates-button {\n  padding: 1rem;\n  border: none;\n  background-color: #003e93;\n  font-size: 1.3em;\n  color: #e8e8ed;\n  font-family: \"Montserrat\", sans-serif;\n}\n.check-rates-button:hover {\n  background-color: #209fdf;\n  color: white;\n}\n\n.dropbtn {\n  width: 100%;\n  height: 100%;\n  padding: 1.32rem;\n  border: none;\n  background-color: whitesmoke;\n  font-size: 1rem;\n  color: black;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.dropdown-content {\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n  right: 0;\n  left: auto;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  background-color: #003e93;\n  color: white;\n  min-width: 160px;\n  width: 600%;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n}\n\nh3 {\n  font-size: 1.9em;\n  margin-bottom: 1.5%;\n}\n\n#arrival {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-arrival {\n  font-size: 1.1em;\n  margin-top: 0%;\n}\n\n#departure {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-departure {\n  font-size: 1.1em;\n  margin-top: 0%;\n}\n\n.filter-by-room-type {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.choose-by-type {\n  font-size: large;\n  width: 78%;\n  height: 1.45em;\n}\n\n.check-availability-button {\n  margin: 15% auto;\n  padding: 1rem;\n  border: none;\n  background-color: white;\n  font-size: 1.1rem;\n  color: #003e93;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.customer-info-display {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 2%;\n}\n\n.hotel-room-cards {\n  color: black;\n  background-color: #ededed;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 2% auto;\n}\n.hotel-room-cards .resort-room-info {\n  padding-left: 2%;\n}\n\n.room-title {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.book-now-button {\n  margin: 34% 1% 0 0;\n  width: 15%;\n  padding: 1rem;\n  border: none;\n  background-color: #003e93;\n  font-size: 1.1rem;\n  color: white;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.show {\n  display: flex;\n}\n\n.hidden {\n  display: none;\n}\n\n.login-holder {\n  margin-top: 8%;\n  width: 50%;\n  height: 110%;\n  background-color: #ededed;\n  display: grid;\n  justify-items: center;\n  align-content: center;\n  justify-content: center;\n}\n\n#login-error-msg-holder {\n  width: 100%;\n  height: 100%;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n#login-error-msg {\n  font-size: large;\n  text-align: center;\n  margin: 0;\n  padding: 5px;\n  color: #8a0000;\n  opacity: 0;\n}\n\n#error-msg-second-line {\n  display: block;\n}\n\n#login-form {\n  align-self: flex-start;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.login-form-field {\n  font-size: large;\n  border: none;\n  margin-bottom: 10px;\n  outline: none;\n  padding: 6px 6px 7px 7px;\n}\n\n.login-form-field::placeholder {\n  color: #3a3a3a;\n}\n\n#login-form-submit {\n  width: 100%;\n  padding: 7px;\n  border: none;\n  color: white;\n  font-weight: bold;\n  font-size: large;\n  background-color: #003e93;\n  cursor: pointer;\n  outline: none;\n  margin-top: 8%;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/_base.scss","webpack://./src/css/main.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_login-page.scss"],"names":[],"mappings":"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","sourcesContent":["html {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  font-family: 'Lato', sans-serif;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  background-color: $secondary-text;\n}\n\n// HEADER CONTAINER\nheader {\n  @include flex-column;\n  width: 100%;\n  color: $primary-text;\n}\n\n// TITLE CONTAINER\n.title-container {\n  display: flex;\n  align-items: flex-end;\n  margin-bottom: 2%;\n\n  .title {\n    padding-left: 2%;\n    font-size: 3em;\n  }\n}\n\n.star-fish {\n  padding-left: 2%;\n  margin-top: 2%;\n}\n\n.sign-in-button {\n  margin-left: 62%;\n  margin-bottom: 4%;\n  background-color: $secondary-text;\n  border: none;\n  font-size: 1.4em;\n  color: $primary-text;\n}\n\n.sign-in-button:hover {\n  color: #209fdf;\n}\n\n// MENU BTNS CONTAINER\n.menu-buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin: 0;\n}\n\n.reservation-button,\n.yearly-expense-button {\n  color: $primary-text;\n  border: none;\n  background-color: $secondary-text;\n  font-size: 1.3em;\n  margin-left: 1%;\n  margin-right: 1%;\n  &:hover {\n    color: #209fdf;\n  }\n}\n\n// DROP DOWN CONTAINER\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.check-rates-button {\n  padding: 1rem;\n  border: none;\n  background-color: $primary-text;\n  font-size: 1.3em;\n  color: #e8e8ed;\n  font-family: $primary-font;\n\n  // .check-rates-button:hover\n  &:hover {\n    background-color: #209fdf;\n    color: $secondary-text;\n  }\n}\n\n.dropbtn {\n  width: 100%;\n  height: 100%;\n  padding: 1.32rem;\n  border: none;\n  background-color: whitesmoke;\n  font-size: 1rem;\n  color: black;\n  font-family: $primary-font;\n}\n\n// DROP DOWN FORM\n.dropdown-content {\n  @include flex-column;\n  z-index: 1;\n  right: 0;\n  left: auto;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  background-color: #003e93;\n  color: $secondary-text;\n  min-width: 160px;\n  width: 600%;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n}\n\nh3 {\n  font-size: 1.9em;\n  margin-bottom: 1.5%;\n}\n\n#arrival {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-arrival {\n  @include date-error-message;\n}\n\n#departure {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-departure {\n  @include date-error-message;\n}\n\n.filter-by-room-type {\n  @include flex-column;\n  align-items: center;\n}\n\n.choose-by-type {\n  font-size: large;\n  width: 78%;\n  height: 1.45em;\n}\n\n.check-availability-button {\n  margin: 15% auto;\n  padding: 1rem;\n  border: none;\n  background-color: $secondary-text;\n  font-size: 1.1rem;\n  color: #003e93;\n  font-family: $primary-font;\n}\n\n// DISPLAY CONTAINER\n.customer-info-display {\n  @include flex-column;\n  align-items: center;\n  margin-top: 2%;\n}\n\n// HOTEL ROOM CARDS\n.hotel-room-cards {\n  color: black;\n  background-color: #ededed;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 2% auto;\n\n  .resort-room-info {\n    padding-left: 2%;\n  }\n}\n\n// CUSTOMER INFO SECTION in DOM\n.room-title {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.book-now-button {\n  margin: 34% 1% 0 0;\n  width: 15%;\n  padding: 1rem;\n  border: none;\n  background-color: #003e93;\n  font-size: 1.1rem;\n  color: $secondary-text;\n  font-family: $primary-font;\n}\n\n.show {\n  display: flex;\n}\n\n.hidden {\n  display: none;\n}\n","html {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Lato\", sans-serif;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n  background-color: white;\n}\n\nheader {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  color: #003e93;\n}\n\n.title-container {\n  display: flex;\n  align-items: flex-end;\n  margin-bottom: 2%;\n}\n.title-container .title {\n  padding-left: 2%;\n  font-size: 3em;\n}\n\n.star-fish {\n  padding-left: 2%;\n  margin-top: 2%;\n}\n\n.sign-in-button {\n  margin-left: 62%;\n  margin-bottom: 4%;\n  background-color: white;\n  border: none;\n  font-size: 1.4em;\n  color: #003e93;\n}\n\n.sign-in-button:hover {\n  color: #209fdf;\n}\n\n.menu-buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin: 0;\n}\n\n.reservation-button,\n.yearly-expense-button {\n  color: #003e93;\n  border: none;\n  background-color: white;\n  font-size: 1.3em;\n  margin-left: 1%;\n  margin-right: 1%;\n}\n.reservation-button:hover,\n.yearly-expense-button:hover {\n  color: #209fdf;\n}\n\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.check-rates-button {\n  padding: 1rem;\n  border: none;\n  background-color: #003e93;\n  font-size: 1.3em;\n  color: #e8e8ed;\n  font-family: \"Montserrat\", sans-serif;\n}\n.check-rates-button:hover {\n  background-color: #209fdf;\n  color: white;\n}\n\n.dropbtn {\n  width: 100%;\n  height: 100%;\n  padding: 1.32rem;\n  border: none;\n  background-color: whitesmoke;\n  font-size: 1rem;\n  color: black;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.dropdown-content {\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n  right: 0;\n  left: auto;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  background-color: #003e93;\n  color: white;\n  min-width: 160px;\n  width: 600%;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n}\n\nh3 {\n  font-size: 1.9em;\n  margin-bottom: 1.5%;\n}\n\n#arrival {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-arrival {\n  font-size: 1.1em;\n  margin-top: 0%;\n}\n\n#departure {\n  margin-bottom: 1%;\n  font-size: 1.3em;\n}\n\n.date-error-departure {\n  font-size: 1.1em;\n  margin-top: 0%;\n}\n\n.filter-by-room-type {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.choose-by-type {\n  font-size: large;\n  width: 78%;\n  height: 1.45em;\n}\n\n.check-availability-button {\n  margin: 15% auto;\n  padding: 1rem;\n  border: none;\n  background-color: white;\n  font-size: 1.1rem;\n  color: #003e93;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.customer-info-display {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 2%;\n}\n\n.hotel-room-cards {\n  color: black;\n  background-color: #ededed;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 2% auto;\n}\n.hotel-room-cards .resort-room-info {\n  padding-left: 2%;\n}\n\n.room-title {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.book-now-button {\n  margin: 34% 1% 0 0;\n  width: 15%;\n  padding: 1rem;\n  border: none;\n  background-color: #003e93;\n  font-size: 1.1rem;\n  color: white;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.show {\n  display: flex;\n}\n\n.hidden {\n  display: none;\n}\n\n.login-holder {\n  margin-top: 8%;\n  width: 50%;\n  height: 110%;\n  background-color: #ededed;\n  display: grid;\n  justify-items: center;\n  align-content: center;\n  justify-content: center;\n}\n\n#login-error-msg-holder {\n  width: 100%;\n  height: 100%;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n#login-error-msg {\n  font-size: large;\n  text-align: center;\n  margin: 0;\n  padding: 5px;\n  color: #8a0000;\n  opacity: 0;\n}\n\n#error-msg-second-line {\n  display: block;\n}\n\n#login-form {\n  align-self: flex-start;\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.login-form-field {\n  font-size: large;\n  border: none;\n  margin-bottom: 10px;\n  outline: none;\n  padding: 6px 6px 7px 7px;\n}\n\n.login-form-field::placeholder {\n  color: #3a3a3a;\n}\n\n#login-form-submit {\n  width: 100%;\n  padding: 7px;\n  border: none;\n  color: white;\n  font-weight: bold;\n  font-size: large;\n  background-color: #003e93;\n  cursor: pointer;\n  outline: none;\n  margin-top: 8%;\n}\n\n.hidden {\n  display: none;\n}","$secondary-text: white;\n$primary-text: #003e93;\n$primary-font: 'Montserrat', sans-serif;\n\n@mixin flex-column() {\n  display: flex;\n  flex-direction: column;\n  // align-items: $placement;\n}\n\n@mixin grid-center() {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n@mixin date-error-message() {\n  font-size: 1.1em;\n  margin-top: 0%;\n}\n","// LOGIN PAGE\n.login-holder {\n  margin-top: 8%;\n  width: 50%;\n  height: 110%;\n  background-color: #ededed;\n  display: grid;\n  justify-items: center;\n  align-content: center;\n  justify-content: center;\n}\n\n#login-error-msg-holder {\n  width: 100%;\n  height: 100%;\n  @include grid-center;\n}\n\n#login-error-msg {\n  font-size: large;\n  text-align: center;\n  margin: 0;\n  padding: 5px;\n  color: #8a0000;\n  opacity: 0;\n}\n\n#error-msg-second-line {\n  display: block;\n}\n\n#login-form {\n  align-self: flex-start;\n  @include grid-center;\n}\n\n.login-form-field {\n  font-size: large;\n  border: none;\n  margin-bottom: 10px;\n  outline: none;\n  padding: 6px 6px 7px 7px;\n}\n\n.login-form-field::placeholder {\n  color: #3a3a3a;\n}\n\n#login-form-submit {\n  width: 100%;\n  padding: 7px;\n  border: none;\n  color: $secondary-text;\n  font-weight: bold;\n  font-size: large;\n  background-color: $primary-text;\n  cursor: pointer;\n  outline: none;\n  margin-top: 8%;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turks-beach.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/transparent-starfish.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/resort-room.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
  }
}

//In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Customer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);


class Hotel {
  constructor(roomsData, bookingsData, customersData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.customers = customersData;
    this.currentCustomer = null;
    this.currentCustomerBooking = null;
    this.availableRooms = [];
  }

  findCurrentCustomer(inputId) {
    this.currentCustomer = this.customers.find((customer) => {
      return customer.id === parseInt(inputId);
    });
  }

  returnCustomerBookings() {
    this.currentCustomerBooking = this.bookings.filter((booking) => {
      return booking.userID === this.currentCustomer.id;
    });
  }

  calculateCustomerBookingsTotals() {
    const bookingTotal = this.bookings.reduce((acc, booking) => {
      if (this.currentCustomer.id === booking.userID) {
        let bookingRoom = this.rooms.find((room) => {
          return booking.roomNumber === room.number;
        });
        acc += bookingRoom.costPerNight;
      }
      return acc;
    }, 0);
    return bookingTotal.toLocaleString();
  }

  returnAvailableRoomsByDate(arrivalDate, departureDate) {
    let unavailableRooms = this.bookings
      .filter((booking) => {
        if (booking.date >= arrivalDate && booking.date <= departureDate) {
          return booking;
        }
      })
      .map((room) => {
        return room.roomNumber;
      });
    let availableRooms = this.rooms.filter((room) => {
      if (!unavailableRooms.includes(room.number)) {
        return room;
      }
    });
    return availableRooms;
  }

  filterRoomsByType(roomType, arrivalDate, departureDate) {
    let availableRooms = this.returnAvailableRoomsByDate(
      arrivalDate,
      departureDate
    );
    let filteredRooms = availableRooms.filter((room) => {
      return roomType === room.roomType;
    });
    return filteredRooms;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "addBooking": () => (/* binding */ addBooking)
/* harmony export */ });
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);



function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then((response) =>
    response.json()
  );
}

function addBooking(room, customer, date) {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID: customer,
      date: date,
      roomNumber: room,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => _scripts_js__WEBPACK_IMPORTED_MODULE_0__.bookingData.push(response.newBooking));
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status} StatusText: ${response.status.text}`
    );
  }
  return response.json();
}




/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sample_data_sample_room_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


const checkAvailabilityBtn = document.querySelector(
  '.check-availability-button'
);
const checkRatesBtn = document.querySelector('.check-rates-button');
const reservationBtn = document.querySelector('.reservation-button');
const rewardsBtn = document.querySelector('.yearly-expense-button');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-form-submit');
const signInBtn = document.getElementById('sign-in-button');
const loginErrorMsg = document.getElementById('login-error-msg');
const beachImage = document.querySelector('.beach-image');
const loginHolder = document.getElementById('login-holder');
const customerInfoDisplay = document.querySelector('.customer-info-display');
const checkRatesDropDownDisplay = document.querySelector('.dropdown-content');
const arrivalDate = document.getElementById('arrival');
const departureDate = document.getElementById('departure');
const roomType = document.getElementById('room-type');
const dateErrorArrival = document.querySelector('.date-error-arrival');
const dateErrorDeparture = document.querySelector('.date-error-departure');

const domUpdates = {
  renderAvailableRoomCards(reservedRoom, booking) {
    customerInfoDisplay.innerHTML += `
        <section class="hotel-room-cards">
        <img class="hotel-room-image" src="./images/resort-room.png" alt="beach-front-hotel-room">
          <article class="resort-room-info">
            <p class="room-title">OCEANVIEW ${reservedRoom.roomType.toUpperCase()}</p>
            <p>BED OPTIONS</p> 
            <p>${reservedRoom.numBeds} ${reservedRoom.bedSize}</p>
            <p>AMENITIES</p> 
            <ul>
              <li>Generously stocked refrigerated private bar</li>
              <li>Bidet: ${reservedRoom.bidet}</li>
              <li>Twice-daily housekeeping service and evening ice delivery</li>
            </ul> 
            <p>ROOM # ${booking.roomNumber}</p>
            <p>RESERVED</p> 
            <p>${booking.date}</p>
            <p>from $${reservedRoom.costPerNight.toFixed(2)} per night</p>
          </article>
        </section>`;
  },

  renderAvailableRewards(hotel) {
    customerInfoDisplay.innerHTML = `
    <h2>You have spent $${hotel.calculateCustomerBookingsTotals()} this year</h2>
    <h2>You have ${hotel.calculateCustomerBookingsTotals()} points to redeem for future stays</h2>`;
  },

  renderAvailableBookingCards(room) {
    customerInfoDisplay.innerHTML += `
        <section class="hotel-room-cards" id="${room.number}">
        <img class="hotel-room-image" src="./images/resort-room.png" alt="beach-front-hotel-room">
          <article class="resort-room-info">
            <p class="room-title"> OCEANVIEW ${room.roomType.toUpperCase()}</p>
            <p>BED OPTIONS</p>
            <p>${room.numBeds} ${room.bedSize}</p>
            <p>AMENITIES</p> 
            <ul>
              <li>Generously stocked refrigerated private bar</li>
              <li>Bidet: ${room.bidet}</li>
              <li>Twice-daily housekeeping service and evening ice delivery</li>
            </ul> 
            <p>ROOM # ${room.number}</p>
            <p>$${room.costPerNight.toFixed(2)} per night </p>
          </article>
          <button class="book-now-button">BOOK NOW</button>
        </section>`;
  },

  checkAvailabilityBtn,
  checkRatesBtn,
  reservationBtn,
  rewardsBtn,
  loginForm,
  loginBtn,
  signInBtn,
  loginErrorMsg,
  beachImage,
  loginHolder,
  customerInfoDisplay,
  checkRatesDropDownDisplay,
  arrivalDate,
  departureDate,
  roomType,
  dateErrorArrival,
  dateErrorDeparture,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sampleRoomData = [
  {
    number: 1,
    roomType: 'residential suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 358.4,
  },
  {
    number: 2,
    roomType: 'suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 477.38,
  },
  {
    number: 3,
    roomType: 'single room',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 491.14,
  },
  {
    number: 4,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44,
  },
  {
    number: 5,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 340.17,
  },
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sampleRoomData);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map