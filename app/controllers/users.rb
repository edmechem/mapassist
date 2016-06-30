# aka Register
get '/users/new' do
  erb :'users/new'
end

post '/users/new' do
  @user = User.new(params)
  if @user.save
    session[:user_id] = @user.id
    redirect '/'
  else
    p "***************"
    p "error!"
    #error handling goes here
    redirect '/users/new'
  end
end

#aka Profile page
get '/users/:id' do
  @user = User.find(params[:id])
  erb :'users/show'
end
