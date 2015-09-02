defmodule BatlethServer.HistoryController do
	use BatlethServer.Web, :controller
	
	def show_info(conn, params) do
		per_page = Batleth.Helpers.integer_parse(params["per_page"])
		from = Batleth.Helpers.integer_parse(params["from"])
		to = Batleth.Helpers.integer_parse(params["to"])
		
		records = DatabaseAccess.WpisChanges.get(from,to)
		if (records |> List.first).timestamp 
			|> DatabaseAccess.WpisChanges.previous 
			|> is_map do 
				records = DatabaseAccess.WpisChanges.previous ++ records 
			end
			
		l = length records
		json conn, %{no_pages: round(Float.ceil(l/per_page)), no_categories: l} 
		
	end
	
	
end
