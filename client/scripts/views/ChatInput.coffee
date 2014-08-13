class Chattrbox.Views.ChatInput extends Backbone.View
	className: 'row chat-input'

	template: '<input type="text" placeholder="Enter a message!">'

	initialize: ->
		console.log 'init input'
		@render()

	render: ->
		@$el.html @template
		@

