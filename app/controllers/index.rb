get '/' do
  erb :index
end

post '/directions' do
  if request.xhr?

    queryURL = URI.escape(
      params[:baseURL] +
      "origin=" + params[:origin] +
      "&destination=" + params[:destination] +
      "&mode=" + params[:mode]
      )

    p "****** queryURL ******"
    p queryURL
    p "**********************"

    response = HTTParty.get(queryURL)
    content_type :json
    return response.to_json

  else
    redirect '/'
  end
end
