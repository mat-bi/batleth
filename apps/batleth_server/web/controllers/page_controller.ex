defmodule BatlethServer.PageController do
  use BatlethServer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
