class Chattrbox.Collections.Messages extends Backbone.Collection

	model: Chattrbox.Models.Message

	url: 'http://localhost:3003/messages'

	initialize: ->
		self = @
		@fetch().success( (data) -> self.reset data )