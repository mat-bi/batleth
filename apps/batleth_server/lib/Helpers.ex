defmodule BatlethServer.Helpers do

	def show_prediction do
		last = DatabaseAccess.get(:last)
        {:ok, _, stat} = BatteryReader.read
        	if DatabaseAccess.Prosta.getLast != nil and (Time.timestamp - DatabaseAccess.Prosta.getLast < 600 and LastChange.get.timestamp < DatabaseAccess.Prosta.getLast and (last.status == 1 or last.status == 0) and last.status == stat) do
           w = (DatabaseAccess.Prosta.getLast |> DatabaseAccess.Prosta.get)
           prediction = -w.b/w.a-Time.timestamp
           if stat == 0 do prediction = prediction + 100/w.a end
           prediction = round(prediction)
           
        else
           prediction = "Unknown"
        end
        status = BatlethServer.PageView.parse_status(stat)
        %{ time: prediction, status: status }
        end
        
        def show_records(from,to) do
        	from = Batleth.Helpers.integer_parse(from)
    		to = Batleth.Helpers.integer_parse(to)
    		DatabaseAccess.get(from,to)
    	end
    	
end
