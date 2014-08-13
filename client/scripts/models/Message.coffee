class Chattrbox.Models.Message extends Backbone.Model
	idAttribute: '_id'

	initialize: (params) ->
		console.log 'params are: ', params
		params or params = {}
		
		@set
      username: params.username || 'anon'
      text: params.text || ''
      createdAt: new Date()

