class Chattrbox.Models.ChatWindow extends Backbone.Model
	initialize: ->
		@set 'messages', new Chattrbox.Collections.Messages()

		@on 'input:username', (username) ->
			@set 'username', username

		@on 'input:message', (text) ->
			username = @get 'username'
			@get('messages').create(username: username, text: text)


