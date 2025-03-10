/* eslint-disable no-new */
/* eslint-disable no-restricted-globals */
import verifyPlace from "./utils/verifyPlace";
import darkMode from "./utils/darkMode";
import NavBar from "./components/navBar";

function checkState() {
  // called when page loads AND after a popstate event
  if (!location.hash) {
    // default first load
    history.replaceState(null, "", "");
    document.title = "Friends TvSeries - Alamin";
    verifyPlace("home");
  } else {
    const hash = location.hash.replace("#", "");
    verifyPlace(hash);
    document.title = hash[0].toUpperCase() + hash.slice(1); // first letter to uppercase needed
  }
}

// Function to find the closest ancestor anchor element
function findAnchor(element) {
  while (element && element.tagName !== "A") {
    // eslint-disable-next-line no-param-reassign
    element = element.parentElement;
  }
  return element;
}

function appClick(ev) {
  ev.preventDefault();
  const anchor = findAnchor(ev.target);
  if (!anchor) return;

  const dest = anchor.getAttribute("data-dest");
  const name = anchor.getAttribute("data-name");
  const state = { dest, name };
  const hash = `#${dest.toLowerCase()}`;
  history.pushState(state, "", hash);
  document.title = name;
  verifyPlace(dest);
}

function addListeners() {
  document.getElementById("App").addEventListener("click", appClick);

  // when the user clicks back or forward
  window.addEventListener("popstate", checkState);
}

function init() {
  // when the page loads
  // check the state or hash value or both
  checkState(); // when the page loads
  // add listeners for nav bar
  // add listeners for popstate OR hashchange
  addListeners();

  // Start dark mode functionality
  darkMode();

  // Start navBar
  new NavBar();
}

document.addEventListener("DOMContentLoaded", init);

