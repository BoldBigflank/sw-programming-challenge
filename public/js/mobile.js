// Models
var viewModel = {}
$.getJSON("/api/events", function(data) { 
    console.log("found data", data)
    viewModel = ko.mapping.fromJS(data)
    ko.applyBindings(viewModel);
})