defmodule GNumber do

        use GenServer
	@doc """
		Allows using 'global variables' - floats or integers.
	"""

	def start_link() do
		GenServer.start_link(__MODULE__, 0)
	end

        def add(pid, l) do
                GenServer.cast(pid, {:add, l})
        end

        def get(pid) do
                GenServer.call(pid, :get)
        end

        def kill(pid) do
                GenServer.cast(pid, :kill)
        end

        def handle_cast({:add, l}, st) do
                {:noreply, st+l}
        end

        def handle_cast(:kill, st) do
                {:stop, :normal, st}
        end

        def handle_call(:get, _, st) do
                {:reply, st, st}
        end
end
