class Chattrbox.Views.ChatInput extends Backbone.View
	className: 'row chat-input'

	template: '<input type="text" placeholder="Enter your username!">'

	initialize: () ->
		@state = 'username'

		@collection = @model.get 'messages'
		
		@inputHandler = 
			username: ($target) =>
				@model.trigger 'input:username', $target.val()
				
				@state = 'messaging'
				$target.attr 'placeholder', 'Enter a message'

			messaging: ($target) =>
				@model.trigger 'input:message', $target.val()
		
		@render()

	events: 
		'keypress input': (event) -> 
			if event.keyCode == 13
				$target = $(event.target)
				@inputHandler[@state]($target)

				$target.val ''
				

	render: ->
		@$el.html @template
		@

