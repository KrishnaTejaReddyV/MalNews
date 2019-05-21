class GraphqlController < ApplicationController
  def execute
    init_db
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      session: session,
      current_user: current_user
    }
    result = MalnewsSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development e
  end

  private

  # initializes articles table with data from news api
  def init_db
    # define categories and iterate through them
    types = ["malware", "vulnerability", "cyber threat", "cloud security", "software exploits"]
    types.each_with_index { |type, index|

      # Add entry into apis table if not exists
      if (!Api.exists?(id: index + 1))
        Api.create!(
          key: Global::GlobalVariables::API_Key,
          last_requested_date: ""
        )
      end

      # get the latest atricle with the category defined by type
      savedRecord = Article.order(published_at: :desc).find_by(category: type)

      # get the latest data from the url
      url = "https://newsapi.org/v2/everything?" +
        "q=" + type + "&" +
        "sortBy=publishedAt&" +
        "language=en&" +
        "pageSize=100&" +
        ((!savedRecord) ? "" : ("from=" + Api.find(index + 1).last_requested_date + "&")) +
        "apiKey=" + Api.find(index + 1).key
      
      response = JSON.parse(RestClient.get(url))

      # check if latest articles are present in the table
      if (!savedRecord ||
        (response["articles"][0] && 
        response["articles"][0]["author"] != savedRecord.author &&
        response["articles"][0]["publishedAt"].in_time_zone.utc != savedRecord.published_at))
        response["articles"].each { |data|
          # set request time
          @api = Api.find(index + 1)
          @api.last_requested_date = Time.now.iso8601.split(/\+/).first
          @api.save

          # add latest data to the table
          Article.create!(
            source: data["source"]["name"],
            author: data["author"],
            title: data["title"],
            description: data["description"],
            url: data["url"],
            url_to_image: data["urlToImage"],
            published_at: DateTime.parse(data["publishedAt"]),
            content: data["content"],
            category: type
          )
        }
      end
    }
  end

  # gets current user from token stored in the session
  def current_user
    return unless session[:token]

    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
    token = crypt.decrypt_and_verify session[:token]
    user_id = token.gsub('user-id:', '').to_i
    User.find_by id: user_id
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    raise "Invalid Signature"
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { error: { message: e.message, backtrace: e.backtrace }, data: {} }, status: 500
  end
end
