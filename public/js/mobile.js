// Models
window.Event = Backbone.Model.extend()

window.EventCollection = Backbone.Collection.extend({
    model:Event,
    url:'/api/events'
})

// Views

window.EventListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function(){
        this.model.bind("reset", this.render, this);
    },
    render:function(eventName){
        _.each(this.model.models, function (event) {
            $(this.el).append(new EventListItemView({model:event}).render().el);
        }, this);
        return this;
    }
})

window.EventListItemView = Backbone.View.extend({
    tagName: 'li',
    template:_.template($('#tpl-event-list-item').html()),
    render: function(eventName){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})

window.EventView = Backbone.View.extend({
    template:_.template($('#tpl-event-details').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "events/:id":"eventDetails"
    },

    list:function () {
        this.eventList = new EventCollection();
        this.eventListView = new EventListView({model:this.eventList});
        this.eventList.fetch();
        $('#sidebar').html(this.eventListView.render().el);
    },

    eventDetails:function (id) {
        this.event = this.eventList.get(id);
        this.eventView = new EventView({model:this.event});
        $('#content').html(this.eventView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();