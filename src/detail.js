let viewing = "";
let modelurl = "/public/models/usdz/";
let previewurl = "/public/img/";

function getViewing() {
    viewing = new URLSearchParams(window.location.search).get("viewing");
}

function changeDescription(lang, target) {
    if(lang == 'cn')
        target = target.cn;
    else if(lang == 'en')
        target = target.en;
    target = target.exhibits;
    
    for (let temp in target) {
        let exhibit = target[`${temp}`];
        console.log(exhibit);
        let tempname = exhibit["wrong"];
        console.log(tempname);
        if(exhibit["name"] == viewing) {
            viewing = exhibit.temp;
            console.log(viewing);
        }
    }
    
    if (typeof viewing == String || viewing == null) {
        viewing = target.exhibits["wrong"];
    }
    // console.log("Viewing: " + viewing.name);
    
    document.getElementById("description").innerHTML = viewing.description;
    document.getElementById("ar-model").href = modelurl + viewing.model;
    document.getElementById("ar-preview").src = previewurl + viewing.preview;
}