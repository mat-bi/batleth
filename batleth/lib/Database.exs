defmodule Database do
	use GenServer
	@supervision_name :sql

	def start_link(_,_) do
		GenServer.start(__MODULE__, Sqlitex.open('batleth.sqlite'), [name: @supervision_name])
	end

	def getLastTimestamp() do
		GenServer.call(@supervision_name, {:get, :last_timestamp})
	end

	def handle_call({:get, :last_timestamp}, _, db) do
		case Sqlitex.query(db, "SELECT timestamp FROM batleth_records ORDER BY timestamp DESC LIMIT 1") do
			[[timestamp: r]] ->
			[] -> r = nil
		end
		{:reply, r, db}
	end
		

		
