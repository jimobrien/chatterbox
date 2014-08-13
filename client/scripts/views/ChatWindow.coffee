class Chattrbox.Views.ChatWindow extends Backbone.View
	className: 'chat-container col-md-8'

	template: _.template '<div class="row chat-window"></div>
											  <div class="row chat-input"></div>'

	initialize: ->
		@messages = @model.get 'messages'
		@username = @model.get 'username'
		# @friends  = @model.get 'friends'
		# @rooms    = @model.get 'rooms'
		@render()

	render: ->
		@$el.html @template
		@$('.chat-window').html new Chattrbox.Views.Messages(collection: @messages).el
		@$('.chat-input').html new Chattrbox.Views.ChatInput(model: @model).el
		@
		
