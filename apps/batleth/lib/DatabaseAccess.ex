defmodule DatabaseAccess do
	@moduledoc """
		An access module to the database. All documentation for the functions - see the Database module.
	"""
	use GenServer
	use Database

	@supervision_name :base

	@doc """
		Starts DatabaseAccess.
	"""
	def start_link(_, _) do
		Amnesia.start
		GenServer.start(__MODULE__,  [], [name: @supervision_name])
	end

	#api
	
	def get(at) do
		GenServer.call(@supervision_name, {:get, at})
	end

	def getLast(n) do
		GenServer.call(@supervision_name, {:getLast, n})
	end

	def lastWpises() do
		GenServer.call(@supervision_name, {:lastWpises})
	end

	def handle_call({:lastWpises}, _, _) do
		{:reply, Wpis.lastWpises(), []}
	end

	def handle_call({:getLast, n}, _, _) when is_integer(n) do
		{:reply, Wpis.last(n, []), []}
	end

	def get(from, to) do
		GenServer.call(@supervision_name, {:get, from, to})
	end

	def add(at) do
		GenServer.call(@supervision_name, {:add, at})
	end


	#Implementation
	
	defp no_db do
		Logging.write(:no_db)
	end

	def handle_call({:get, :last_timestamp}, _, _) do
		case Wpis.getLast() do
                	nil -> {:reply, {:ok, 0}, []}
                        l when is_integer(l) -> {:reply, {:ok, l}, []}
                        _ ->    no_db
				{:reply, {:error, :db}, []}
		end
	end
	
	def handle_call({:get, from, to}, _, _) do
		{:reply, Wpis.get(from, to), []}
	end

	def handle_call({:get, :last}, _, _) do
		tmp = Wpis.getLast()
		{:reply, Wpis.get(tmp), []}
	end

	def handle_call({:add, %{status: stat, pr: per}}, _, _) do
		case Wpis.parse_wpis(per, stat) |> Wpis.add do
			l when is_map(l) -> {:reply, {:ok}, []}
			nil -> 
				no_db
				{:reply, {:error, :db}, []}
		end
	end
end


