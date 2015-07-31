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
    get "/last", RecordsController, :last
  end

  # Other scopes may use custom stacks.
  # scope "/api", BatlethServer do
  #   pipe_through :api
  # end
end
