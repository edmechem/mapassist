# aka "Login"
get '/sessions/new' do
  erb :'sessions/new'
end

post '/sessions/new' do
  @user = User.find_by(email: params[:email])
  password = params[:password]

  if @user && @user.authenticate(password)
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
  session[:user_id] = nil
  redirect '/'
end
