let viewing = "";
let modelurl = "./public/models/usdz/";
let previewurl = "./public/img/";
let descriptionurl = "./src/exhibits/";

function getViewing() {
    viewing = new URLSearchParams(window.location.search).get("viewing");
    localStorage.setItem('ARQuickLookCompatiable', arQuickLookCompatiable());
}

function arQuickLookCompatiable() {
    let ua = window.navigator.userAgent;
    // Make sure user device is iphone or ipad. @TODO Add Apple Vision Pro support
    if (ua.match(/iPhone/) || ua.match(/iPad/) || (ua.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) {
        // Confirm IOS version
        let osVersion = parseInt(ua.substring(ua.indexOf("Version/") + 8, ua.indexOf("Version/") + 10))
        return osVersion >= 12;
    }

    return false;
}

function changeDescription(lang, target) {
    let tooltip = target;
    target = target.exhibits;

    for (let temp in target) {
        if(temp == viewing) {
            target = target[`${temp}`];
        }
    }
    
    if (target.name === undefined || target.name === "wrong") {
        console.log("Exhibit " + viewing + " not found! Showing default object");
        target = target["wrong"];
    }
    console.log("Viewing: " + target.name + " in " + lang);

    let backurl = document.querySelector("[name=\"brand\"]").href;
    backurl = backurl + "#" + target.name;
    document.querySelector("[name=\"brand\"]").href = backurl;
    
    document.getElementById("description-body").src = descriptionurl 
        + target.description.replace("cn", lang);
    
    if ((/true/).test(localStorage.getItem('ARQuickLookCompatiable'))) {
        document.getElementById("ar-model").href = modelurl + target.model;
        if (lang == "cn") {document.getElementById("ar-tooltip").innerHTML = tooltip.ar_tooltip.cn;}
        else if(lang === 'en') {document.getElementById("ar-tooltip").innerHTML = tooltip.ar_tooltip.en;}
    } else {
        document.getElementById("ar-model").href = "";
        document.getElementById("ar-tooltip").innerHTML = "";
    }
    
    if(lang === 'cn')
        document.getElementById("viewerButton").innerHTML = tooltip.viewerButton.cn;
    else if(lang === 'en')
        document.getElementById("viewerButton").innerHTML = tooltip.viewerButton.en;

    document.getElementById("ar-preview").src = previewurl + target.preview;
}

function view() {
    window.open("./viewer.html?viewing=" + viewing, '_self')
}