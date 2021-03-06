defmodule BatlethServer.RecordsController do
    use BatlethServer.Web, :controller

    def show(conn, params) do
    	
    	json conn, BatlethServer.Helpers.show_records(params["from"], params["to"])
    end
    
    
    def show_by_status(conn, params) do
    	from = Batleth.Helpers.integer_parse(params["from"])
    	to = Batleth.Helpers.integer_parse(params["to"])
    	st = Batleth.Helpers.integer_parse(params["status"])
    	
    	json conn, DatabaseAccess.get(from, to, st)
    end
end
