helpers do
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # def em(text)
  #   "<em>#{text}</em>"
  # end
end
