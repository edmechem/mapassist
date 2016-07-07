post '/geocode/new' do
  if request.xhr?
    # geocoder_result = Geocoder.search(params[:location])
    # return geocoder_result.to_json
    # the above didn't work, so I went to cmd line below

    shell_cmd = "geocode -js google #{params[:location]}"
    results = IO.popen(shell_cmd)
    return results

  end
end
