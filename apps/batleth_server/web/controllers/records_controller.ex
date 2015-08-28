defmodule BatlethServer.RecordsController do
    use BatlethServer.Web, :controller

    def show(conn, params) do
    	from = Batleth.Helpers.integer_parse(params["from"])
    	to = Batleth.Helpers.integer_parse(params["to"])
    	
    	json conn, DatabaseAccess.get(from,to)
    end
end
