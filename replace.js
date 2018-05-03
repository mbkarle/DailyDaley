//image replace
var images = document.getElementsByTagName("img");
var pictures = document.getElementsByTagName("PICTURE");
console.log(images);
function replaceImages(images){
    for(var i = 0; i < images.length; i++){
        var replacement = getRandURL();
        if(!images[i].src.startsWith("chrome")){
            images[i].src = replacement; 
        }
        if(!images[i].srcset.startsWith("chrome")){
            images[i].srcset = replacement;
        }
    }
}

function replacePictures(pictures){//for the rare picture tag
    for(var i = 0; i < pictures.length; i++){
        var replacement = getRandURL();
        for(var source of pictures[i].getElementsByTagName("SOURCE")){
            source.srcset = replacement;
//            source.src = replacement;
        }
    }
}

function getRandURL(){
    var number = Math.floor(Math.random() * 15);
    return chrome.runtime.getURL("images/"+number+".png");
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
                    if(mutation.addedNodes){
                        callback(mutation.addedNodes);
                    }
                    if(mutation.attributeName != null && !mutation.target.src.startsWith("chrome")){
                        callback([mutation.target]);
                    }
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
/*window.onload = function(){*/
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
        if(pictures.length){
            replacePictures(pictures);
        }
        observeDOM( document.body ,function(nodes){ 
            console.log(nodes);
            var img = [];
            var pic = [];
            for(var i = 0; i < nodes.length; i++){
                if(nodes[i].tagName == "IMG"){
                    img.push(nodes[i]);
                }
                else if(nodes[i].tagName == "SOURCE" && !nodes[i].srcset.startsWith("chrome")){
                    pic.push(nodes[i]);
                }
                if(nodes[i].tagName != undefined){
                var childImages = nodes[i].getElementsByTagName("img");
                var childPictures = nodes[i].getElementsByTagName("PICTURE");
                for(var j = 0; j < childImages.length; j++){
                    img.push(childImages[j]);
                }
                for(var j = 0; j<childImages.length; j++){
                    pic.push(childPictures[j]);
                }
                }
            }
            if(img.length){
                replaceImages(img);
            }
            if(pic.length){
                replacePictures(pictures);
            }
        
            
        });
    }
    });
//}
