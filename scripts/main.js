

document.addEventListener('DOMContentLoaded', function () {
    chrome.topSites.get(getMostVisited);
    chrome.management.getAll(getAllApps);
    createComponent("#tabs", function(filter) {$(filter).tabs({heightStyle: "fill"});});
});
            
function getMostVisited(data) {
    var topSiteItem = ' <li class="topSite">\
                        <a href="{0}" >\
                        <img src="chrome://favicon/{0}" />\
                        {1}\
                        </a>\
                        </li>'
    $("#mostVisited").append('<ul id="menu">')                  
    for (var i = 0; i < data.length - 1; i++) {
        $("#menu").append(topSiteItem.format(data[i].url, data[i].title));
    }
    $("#mostVisited").append('</ul>')
    createComponent("#menu", function(filter){
        $(filter).menu();
    });
    
}

function getAllApps(data) {
    // String for apps.
    var launcherItem = '<li class="launcher" appId="{0}">\
                        <div>\
                        <img src="{2}" width="128" height="128" />\
                        </div>\
                        <span>\
                        {1}\
                        </span>\
                        </li>'
    console.log("Installed App Count:" + data.length);
    for (var i = data.length - 1; i >= 0; i--) {
        console.log("Found App: " + data[i].name + " type:" + data[i].type);
        if (data[i].type == 'theme' || 
            data[i].type == 'extension' ) {
            continue;
        };
        $("#appContainer")
            .append(launcherItem.format(data[i].id, 
                                        data[i].name ,
                                        data[i].icons[data[i].icons.length - 1].url));
    }

    $("#appContainer").sortable();
    $("#appContainer").disableSelection();
    createComponent(".launcher", function(filter){
        $(filter).each(function(index, element){
            $(element)
            .button()
            .click(function(){
                chrome.management.launchApp($(this).attr("appId"));
            })

        })
    });
    
}

function createComponent(filter, packFunction){
    packFunction(filter);
}

function getAndSaveApplist(data) {

}        