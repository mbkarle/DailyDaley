//background js
chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: '*'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
