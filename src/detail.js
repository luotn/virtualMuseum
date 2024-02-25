let viewing = "";

function getViewing() {
    viewing = new URLSearchParams(window.location.search).get("viewing");
}
