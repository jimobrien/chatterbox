class Chattrbox.Views.Message extends Backbone.View
	tagName: 'li'	
	template: _.template '<span class="username"> <%= username %>: </span> 
											  <span class="message"> <%= text %> </span>'
	initialize: ->
		@render()

	render: ->
		console.log @model.attributes
		@$el.html @template @model.attributes
		@
