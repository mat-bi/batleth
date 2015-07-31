defmodule BatlethServer.RecordsController do
    use BatlethServer.Web, :controller

    def last(conn, _params) do
	last = GenServer.call(:base, {:get, :last})
	render conn, "last.html", last: last
    end
end
