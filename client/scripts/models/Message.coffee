class Chattrbox.Models.Message extends Backbone.Model
  initialize: (params) ->
    @set
      username: params.username || 'anon'
      text: params.text || ''
      createdAt: new Date()

