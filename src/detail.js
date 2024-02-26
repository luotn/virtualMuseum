let viewing = "";
let modelurl = "/public/models/usdz/";
let previewurl = "/public/img/";
let descriptionurl = "/src/exhibits/";

function getViewing() {
    viewing = new URLSearchParams(window.location.search).get("viewing");
}

function changeDescription(lang, target) {
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
    
    document.getElementById("description-body").src = descriptionurl 
        + target.description.replace("cn", lang);
    document.getElementById("ar-model").href = modelurl + target.model;
    document.getElementById("ar-preview").src = previewurl + target.preview;
    resizeIFrameToFitContent(document.getElementById( 'description-body' ));
}

function resizeIFrameToFitContent( iFrame ) {

    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 200;
}