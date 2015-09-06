require 'sinatra'

get '/' do
  @now = Time.now
  haml :index
end

get '/hi' do
  "Hello World!"
end

get '/hello' do
  "Who are you?"
end
