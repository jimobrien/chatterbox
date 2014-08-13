class Chattrbox.Views.ChatWindow extends Backbone.View
	className: 'row chat-window'

	initialize: ->
		@render()

	render: ->
		@$el.html new Chattrbox.Views.Messages(collection: @model.get 'messages').el
		
