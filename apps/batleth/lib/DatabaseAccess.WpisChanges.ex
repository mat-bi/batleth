defmodule DatabaseAccess.WpisChanges do
	use GenServer
	use Database
	
	@supervision_name :base_wpischanges
	def start_link(_,_) do
		GenServer.start_link(__MODULE__, [], [name: @supervision_name])
	end
	
	def get(from, to) do
		GenServer.call(@supervision_name, {:get, from, to})
	end
	
	def add(timestamp, status) do
		GenServer.cast(@supervision_name, {:add, timestamp, status})
	end
	
	def previous(timestamp) do
		GenServer.call(@supervision_name, {:get, :previous, timestamp})
	end
	
	def handle_call({:get, from, to}, _, _) do
		{:reply, WpisChanges.get(from, to), []}
	end
	
	def handle_call({:get, :previous, timestamp}) do
		{:reply, WpisChanges.previous(timestamp), []}
	end
	
	def handle_cast({:add, timestamp, status}, _) do
		WpisChanges.parse(timestamp, status) |> WpisChanges.add
		{:noreply, []}
	end
	
	
end
