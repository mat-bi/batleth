defmodule BatlethServer.BatteryController do
    use BatlethServer.Web, :controller
    
    def show_percentage(conn, _params) do
        {:ok, pr, _} = BatteryReader.read()
        
        json conn, %{ pr: pr}
    end
    
    def show_prediction(conn, _params) do
        
        json conn, BatlethServer.Helpers.show_prediction()   
    end
    
    def show_chart(conn, params) do
    	json conn, %{records: BatlethServer.Helpers.show_records(params["from"], params["to"]), prediction: BatlethServer.Helpers.show_prediction()}
    end
    
    
end
