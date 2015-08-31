defmodule BatlethServer.BatteryController do
    use BatlethServer.Web, :controller
    
    def show_percentage(conn, _params) do
        {:ok, pr, _} = BatteryReader.read()
        
        json conn, %{ pr: pr}
    end
    
    def show_prediction(conn, _params) do
        last = DatabaseAccess.get(:last)
        {:ok, _, stat} = BatteryReader.read
        if Time.timestamp - DatabaseAccess.Prosta.getLast < 600 and LastChange.get.timestamp < DatabaseAccess.Prosta.getLast and (last.status == 1 or last.status == 0) and last.status == stat do
           w = (DatabaseAccess.Prosta.getLast |> DatabaseAccess.Prosta.get)
           prediction = round(Time.timestamp+w.b/w.a)
        else
           prediction = "Unknown"
        end
        status = if stat == 0 or stat == 1 do BatlethServer.PageView.parse_status(stat) else "Unknown" end
        json conn, %{ time: prediction, status: status }   
    end
    
    
end
