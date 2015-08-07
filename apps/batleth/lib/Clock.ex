defmodule Clock do
    use GenServer
    @supervision_name :clock

    @doc """
        Starts a new thread to count time for adding records.
        If succeeded, returns a tuple {:ok, pid}
        """
	def start_link(_, _) do
        	GenServer.start(__MODULE__, [], [name: @supervision_name])
	end

	@docs """
		Gets the current time difference between now and the last record. 
		Possible responses:
		{:wait, time_difference} -> tells the app to wait
		{:ok, time_difference} -> ok, read
		{:error, :db} -> there is an error with the database
		"""
	def read do
		GenServer.call(@supervision_name, {:read})
	end

	def handle_call({:read}, _, _) do
	use Database
		case DatabaseAccess.get(:last_timestamp) do
			{:ok, last_timestamp} ->
				time_dif = Time.timestamp-last_timestamp
				cond do
					time_dif < 60 ->
						{:reply, {:wait, time_dif}, []}
					time_dif > 60 ->
						{:reply, {:interruption, time_dif}, []}
					time_dif == 60 or Wpis.get(last_timestamp).status == nil ->
						{:reply, {:ok, time_dif}, []}
				end
			{:error, :db} -> {:reply, {:error, :db}, []}
		end
	end
end

