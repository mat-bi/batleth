defmodule BatlethServer.HistoryController do
	use BatlethServer.Web, :controller
	
	def show_info(conn, params) do
		IO.inspect params
		case Batleth.Helpers.integer_parse(params["per_page"]) do
			0 -> json conn, %{no_pages: 0, no_categories: 0}
			per_page when is_integer(per_page) ->
				from = Batleth.Helpers.integer_parse(params["from"])
				to = Batleth.Helpers.integer_parse(params["to"])
				case DatabaseAccess.WpisChanges.get(from,to) do
					[] -> no_pages = no_categories = 0
					a when is_list(a) -> case (a |> List.first).timestamp 
									|> DatabaseAccess.previous do

									nil-> no_pages = length(a)/per_page |> Batleth.Helpers.ceil_integer
									             no_categories = length(a)
							    		t when is_map(t) -> no_pages = (length(a)+if t.timestamp >= from do 1 else 0 end)/per_page |> Batleth.Helpers.ceil_integer
							    			            no_categories = length(a) + if t.timestamp >= from do 1 else 0 end
							     end
				end				
		end
		json conn, %{no_pages: no_pages, no_categories: no_categories} 
		
	end
	
	def show_page(conn, params) do
	end
	
	
end
