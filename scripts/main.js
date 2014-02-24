

document.addEventListener('DOMContentLoaded', function () {
    chrome.topSites.get(getMostVisited);
    chrome.management.getAll(getAllApps);
    createComponent("#tabs", "tab");
});
            
function getMostVisited(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        $("#mostVisited").append(data[i].url+"<br>");
        $("#mostVisited").append(data[i].title+"<br>");
    }
    console.log("Top Site Count:" + data.length);
    
}

function getAllApps(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].type == 'theme' || 
            data[i].type == 'extension' ) {
            continue;
        };
        $("#installedApps").append("<div class='launcher' appid='" + data[i].id + "'><img src='" + data[i].icons[data[i].icons.length - 1].url + "'><br>" + data[i].name + "</div>");
        console.log("App" + data[i].name + "has" + data[i].icons.length + "icons");
        console.log("Sizes availiable:");
        for (var j = data[i].icons.length - 1; j >= 0; j--) {
            console.log(data[i].icons[j].size);
        };
    }
    createComponent(".launcher", "button");
    console.log("Installed App Count:" + data.length);
}

function createComponent(filter, type){
    $(function() {
        switch(type){
            case 'tab':
                $( filter ).tabs();
                break;
            case 'button':
                $( filter )
                    .button()
                    .click(function(){
                        chrome.management.launchApp($( this ).attr('appid'));
                    });

                break;
        }
    });
}

function getAndSaveApplist(data) {

}        