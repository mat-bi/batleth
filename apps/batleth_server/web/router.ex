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
    get "/show/battery/percentage", BatteryController, :show_percentage
    get "/show/battery/prediction", BatteryController, :show_prediction
    get "/show/:from/:to", RecordsController, :show
    get "/show/:from/:to/:status", RecordsController, :show_by_status
    get "/show/history/:per_page/:from/:to", HistoryController, :show_info
  end

  # Other scopes may use custom stacks.
  # scope "/api", BatlethServer do
  #   pipe_through :api
  # end
end
