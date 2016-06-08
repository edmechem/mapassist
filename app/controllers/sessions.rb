# aka "Login"
get '/sessions/new' do
  erb :'sessions/new'
end

post '/sessions/new' do
  #find user based on username
  @user = User.find_by(username: params[:username])
  password = params[:password]

  #validate user based on valid password (using bcrypt)
  #if it does
  #&& is checking if user is not nill !!
  if @user && @user.authenticate(password)
    #set the user-id to session
    session[:user_id] = @user.id
    redirect '/'
  else
    @error = "Your username or password was incorrect"
    p "************"
    p @error
    erb :'/sessions/new'
  end
end

get '/sessions/delete' do
  session.clear
  redirect '/'
end
