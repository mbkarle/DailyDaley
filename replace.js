//image replace
var images = document.getElementsByTagName("img");
console.log(images);
function replaceImages(images){
    for(var i = 0; i < images.length; i++){
        var number = Math.floor(Math.random() * 12);
        /*var ending = (number == 0 ||number== 8)?".png":".jpg";*/
        var replacement = chrome.runtime.getURL("images/" + number + ".png"); 
        images[i].src = replacement; 
        images[i].srcset = replacement;
    }
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                /*if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ){//typically good to detect removed nodes but we only care about updating new images
                    callback(mutations[0].addedNodes);
                }*/
                for(var mutation of mutations){
                    callback(mutation.addedNodes);
                }

            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true, attributes: true, attributeFilter:['src', 'srcset'] });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

// Observe a specific DOM element:
window.onload = function(){
    chrome.storage.sync.get("DailyDaley", function(response){
    if(response["DailyDaley"]){
        if(images.length){
        replaceImages(images);
        }
        else{
            setTimeout(function(){
                var images = document.getElementsByTagName("img");
                replaceImages(images);
            }, 3000);
        }
        observeDOM( document.body ,function(nodes){ 
            console.log(nodes);
            var img = [];
            for(var i = 0; i < nodes.length; i++){
                if(nodes[i].tagName == "IMG"){
                    img.push(nodes[i]);
                }
                if(nodes[i].tagName != undefined){
                var childImages = nodes[i].getElementsByTagName("img");
                for(var j = 0; j < childImages.length; j++){
                    img.push(childImages[j]);
                }
                }
            }
            if(img.length){
                replaceImages(img);
            }
        });
    }
    });
}
