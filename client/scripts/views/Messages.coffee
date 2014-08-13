class Chattrbox.Views.Messages extends Backbone.View
	tagName: 'ul'	

	className: 'chats'

	initialize: ->
    @collection.on 'add reset', => @render()
    @render()

	render: -> 
		@$el.children().detach()
		@$el.append @collection.map (message) ->
			new Chattrbox.Views.Message(model: message).$el
		@

