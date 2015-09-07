defmodule BatlethServer.Router do
  use BatlethServer.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BatlethServer do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    post "/", PageController, :filter
    get "/battery/show/percentage", BatteryController, :show_percentage
    get "/battery/show/prediction", BatteryController, :show_prediction
    get "/battery/show/:from/:to", RecordsController, :show
    get "/battery/show/:from/:to/:status", RecordsController, :show_by_status
    post "/history/show/page/:page/:per_page/", HistoryController, :show_page
    get "/history/show/:per_page/:from/:to", HistoryController, :show_info
    
  end

  # Other scopes may use custom stacks.
  # scope "/api", BatlethServer do
  #   pipe_through :api
  # end
end
