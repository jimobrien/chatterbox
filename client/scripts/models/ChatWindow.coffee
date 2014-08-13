class Chattrbox.Models.ChatWindow extends Backbone.Model
	initialize: ->
		console.log 'init chatwindow model'
		@set 'messages', new Chattrbox.Collections.Messages()

		# @set 'messagesView', new Chattrbox.Views.Messages({collection: collection})

