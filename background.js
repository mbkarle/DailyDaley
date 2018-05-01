//background js
chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({DailyDaley: true}, function(){console.log("Enabled");});
    chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: '*'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
