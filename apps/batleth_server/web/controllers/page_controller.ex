defmodule BatlethServer.PageController do
  use BatlethServer.Web, :controller

  def index(conn, _params) do
    records = GenServer.call(:base, {:get, 1438207200, 1438580010})
    records = Enum.reverse(records)
    last = GenServer.call(:base, {:get, :last})
    render conn, "index.html", records: records, last: last
  end
end
