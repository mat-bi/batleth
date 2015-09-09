defmodule BatlethServer.HistoryController do
	use BatlethServer.Web, :controller
	
	def show_info(conn, params) do
		case Batleth.Helpers.integer_parse(params["per_page"]) do
			0 -> json conn, %{no_pages: 0, no_categories: 0}
			per_page when is_integer(per_page) ->
				from = params["from"] |> Time.date_to_timestamp
				to = params["to"] |> Time.date_to_timestamp
				
				charge = -Stat.average(from, to, :greater) |> round
				discharge = Stat.average(from, to) |> round
				case DatabaseAccess.WpisChanges.get(from,to-1) do
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
		json conn, %{no_pages: no_pages, no_categories: no_categories, charge: charge, discharge: discharge} 
		
	end
	
	defp empty(conn) do
		json conn, []
	end
	
	def show_page(conn, params) do
		page = (params["page"] |> Batleth.Helpers.integer_parse)
		per_page = params["per_page"] |> Batleth.Helpers.integer_parse
		
		cond  do
			per_page <= 0 or page <= 0 -> conn |> empty
			is_integer(per_page) -> 
				from =  params["from"] |> Time.date_to_timestamp
				to = params["to"] |> Time.date_to_timestamp
				case DatabaseAccess.WpisChanges.get(from,to-1) do
					[] -> empty(conn)
					records when is_list(records) ->
						if (records |> List.first).timestamp != from do
							case DatabaseAccess.get(from, (records |> List.first).timestamp-1) do
								[] -> true
								t when is_list(t) -> records = [%Database.WpisChanges{timestamp: (t |> List.first).timestamp, status: (t |> List.first).status}] ++ records
							end					
						end
				
						if (records |> List.last).timestamp != to do
							case DatabaseAccess.get((records |> List.last).timestamp, to-1) do
								[] -> true
								t when t |> is_list -> records = records ++ [%Database.WpisChanges{timestamp: (t |> List.last).timestamp, status: (t |> List.last).status}]
							end
						end
						json conn, records |> changes |> Enum.slice((page-1)*per_page, per_page)
				end
				
				
		end
	end
	
	def changes([], tab) do
		tab
	end
	
	def changes([h], tab) do
		tab
	end
	
	def changes([h|t], tab \\ []) do

		if length(t) == 0 do
			tab
		else
			[head| _] = t
			first = h.timestamp |> DatabaseAccess.get
			last = head.timestamp |> DatabaseAccess.previous
			last = if last == nil or last.timestamp < first.timestamp do first else last end
			tab = tab ++ [%Change{from_date: Time.timestamp_to_date(first.timestamp),
						to_date: Time.timestamp_to_date(last.timestamp),
						from_hour: Time.timestamp_to_hour(first.timestamp),
						to_hour: Time.timestamp_to_hour(last.timestamp),
						status: first.status |> BatlethServer.PageView.parse_status,
						from_pr: first.pr,
						to_pr: last.pr}]
			changes(t, tab)
		end
	end
	
	
	
	
end
