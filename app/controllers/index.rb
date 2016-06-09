get '/' do
  erb :index
end

get '/directions' do
  if request.xhr?
    queryURL = params
    p "****** params ******"
    p params

  else
    redirect '/'
  end
end
