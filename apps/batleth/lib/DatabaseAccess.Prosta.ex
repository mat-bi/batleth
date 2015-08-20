defmodule DatabaseAccess.Prosta do
	use GenServer
	use Database
	
	@supervision_name :db_prosta

	def start_link(_, _) do
		Amnesia.start
		GenServer.start_link(__MODULE__,  [], [name: @supervision_name])
	end

	def getLast() do
		GenServer.call(@supervision_name, {:getLast})
	end

        def get(from, to, status \\ nil) do
                GenServer.call(@supervision_name, {:get, from, to, status})
        end

	def add(prosta) do
		GenServer.call(@supervision_name, {:add, prosta})
	end

	def delete(from, to) do
                GenServer.call(@supervision_name, {:delete, from, to})
        end

	def delete(tmp) do
                GenServer.call(@supervision_name, {:delete, tmp})
        end

        def handle_call({:get, from, to, status}, _, _) do
                {:reply, Prosta.get(from, to, status), []}
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
           
	def handle_call({:delete, from, to}, _, _) do
                {:reply, Prosta.del(from, to), []}
        end   

	def handle_call({:delete, tmp}, _, _) do
                {:reply, Prosta.del(tmp), []}
 	end  

end
