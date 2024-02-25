function changeToDefaultLanguage(page){
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
    console.log("Changing to " + lang);
    updateSelector(lang);
    fetch("src/lang.json")
        .then(response => response.json())
        .then(langObj => {
            let target = langObj.pages;
            if(page == 'index')
                target = target.index;
            else if(page == 'menu')
                target = target.menu;

            if(lang == 'cn')
                target = target.cn;
            else if(lang == 'en')
                target = target.en;

            for (let key in target) {
                if(target[`${key}`].name != undefined) {
                    let type = target[`${key}`];
                    document.getElementById(`${key}`).innerHTML = type.name;
                    for(let cate in type.category) {
                        let category = type.category[`${cate}`];
                        document.getElementById(`${cate}`).innerHTML = category.name;
                        document.getElementById(`${cate}` + '_menu').innerHTML = category.name;
                        for(let item in category) {
                            if(`${item}` != "name")
                                document.getElementById(`${item}`).innerHTML = `${category[item]}`;
                        }
                    }
                } else
                    document.getElementById(`${key}`).innerHTML = `${target[key]}`;
            }
        });
}

function updateSelector(lang)
{
    document.getElementById("en").style.textDecoration = "inherit";
    document.getElementById("cn").style.textDecoration = "inherit";
    document.getElementById(lang).style.textDecoration = "underline";
}