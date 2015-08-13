defmodule DatabaseAccess.Prosta do
	use GenServer
	use Database
	
	@supervision_name :db_prosta

	def start_link(_, _) do
		Amnesia.start
		GenServer.start(__MODULE__,  [], [name: @supervision_name])
	end

	def getLast() do
		GenServer.call(@supervision_name, {:getLast})
	end

	def add(prosta) do
		GenServer.call(@supervision_name, {:add, prosta})
	end

	def handle_call({:getLast}, _, _) do
		{:reply, Prosta.getLast, []}
	end

        def handle_call({:add, prosta}, _, _) when is_map(prosta) do
                case Prosta.parse_prosta(prosta) |> Prosta.add do
                        l when is_map(l) -> {:reply, {:ok}, []}
                        nil -> {:reply, {:error, :db}, []}
                end
        end
                

end
