let page = document.body;
var div = document.createElement("DIV");
window.onload = function(){
chrome.storage.sync.get("DailyDaley", function(response){
    var checked = (response["DailyDaley"])?"checked":"";
    var divHTML = "<input type='checkbox' id='DailyDaley' name='active' value='DailyDaley' " + checked+"><label for='DailyDaley'>Enabled</label>";
    div.innerHTML = divHTML;
    document.body.appendChild(div);
    $("#DailyDaley").on('change', function(){
        var item = this.checked;
        chrome.storage.sync.set({DailyDaley:item}, function(){
            console.log("Status changed to " + item);
        });
    });
});
}

