function init(page){
    const defaultLang = localStorage.getItem('demoLanguage');
    if(defaultLang == null) {
        const langNative = navigator.language;
        if(/^zh\b/.test(langNative)) {
            localStorage.setItem('demoLanguage', 'cn');
        }
        else {
            localStorage.setItem('demoLanguage', 'en');
        }
    }
    changeTo(localStorage.getItem('demoLanguage'), page);
}

function changeToSetLanguage(page) {
    changeTo(localStorage.getItem('demoLanguage'), page)
}

function changeLanguage(page)
{
    let lang = localStorage.getItem('demoLanguage');
    if(lang == 'en'){
        localStorage.setItem('demoLanguage', 'cn');
    } else{
        localStorage.setItem('demoLanguage', 'en');
    }
    changeTo(localStorage.getItem('demoLanguage'), page);
}

function changeTo(lang, page)
{
    document.documentElement.lang = lang;
    console.log("Changing to " + lang);
    updateSelector(lang);
    fetch("./src/lang.json")
        .then(response => response.json())
        .then(langObj => {
            let target = langObj.pages;
            if(page === 'index')
                target = target.index;
            else if (page === 'detail') {
                target = target.detail;
                changeDescription(lang, target);
            }

            if(lang === 'cn')
                target = target.cn;
            else if(lang === 'en')
                target = target.en;

            for (let key in target) {
                if(key !== "exhibits") {
                    let elements = document.getElementsByName(`${key}`);
                    for(let i = 0; i < elements.length; i++)
                        elements.item(i).innerHTML = `${target[key]}`
                }
            }
        });
}

function updateSelector(lang)
{
    document.getElementById("en").style.textDecoration = "inherit";
    document.getElementById("cn").style.textDecoration = "inherit";
    document.getElementById(lang).style.textDecoration = "underline";
}