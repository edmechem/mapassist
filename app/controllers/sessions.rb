# aka "Login"
get '/sessions/new' do
  erb :'sessions/new'
end

post '/sessions/new' do
  #find user based on email address
  @user = User.find_by(username: params[:username])
  #validate user based on valid password
  #if it does
  #&& is checking if user is not nill !!
  if @user && @user.password == params[:password]
    #set the user-id to session
    session[:user_id] = @user.id
    redirect '/'
  else
    @error = "Your password or email was incorrect"
    erb :'/sessions/new'
  end
end

get '/sessions/delete' do
  session.[:user_id] = nil
  current_user = nil
  redirect '/'
end
