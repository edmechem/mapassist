# aka Register
get '/users/new' do
  erb :'users/new'
end

post '/users/new' do
  @user = User.new(username: params[:username], password: params[:password])
  if @user.save
    session[:id] = @user.id
    redirect '/'
  else
    #error handling goes here
    redirect '/users/new'
  end
end

#aka Profile page
get '/users/:id' do
  @user = User.find(params[:id])
  erb :'users/show'
end
