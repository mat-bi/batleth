defmodule DatabaseAccess do
	use GenServer
	#use Database

	@supervision_name :base

	@doc """
		Starts databaseaccess.
	"""
	def start_link(_, _) do
		GenServer.start(__MODULE__,  [], [name: @supervision_name])
	end

	def get(at) do
		GenServer.call(@supervision_name, {:get, at})
	end
	
	def add(at) do
		GenServer.cast(@supervision_name, {:add, at})
	end
	
	defp no_db do
		Logging.write(:no_db)
	end

	def handle_call({:get, :last_timestamp}, _, _) do
		case Database.getLastTimestamp() do
                	nil -> {:reply, {:ok, 0}, []}
                        l when is_integer(l) -> {:reply, {:ok, l}, []}
                        _ ->    no_db
				{:reply, {:error, :db}, []}
		end
	end

	def handle_cast({:add, nil}, _) do
		Database.add(nil)
		{:noreply, []}
		
	end

	def handle_cast({:add, %{status: stat, percentage: per}}, _) do
		Database.add(stat, per)
		{:noreply, []}
	end
end


