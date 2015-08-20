defmodule GNumber do
	@moduledoc """
		Allows using 'global variable' - float or integer.
	"""
	
        use GenServer

	@doc """
		Starts GNumber.
	"""
	def start_link() do
		GenServer.start_link(__MODULE__, 0)
	end

#API

	@doc """
		Adds a number ('l' parameter) to GNumber. First parameter is pid of using GNumber.
	"""
        def add(pid, l) do
                GenServer.cast(pid, {:add, l})
        end

	@doc """
		Gets value of Gnumber. Parameter is pid of the GNumber process.
	"""
        def get(pid) do
                GenServer.call(pid, :get)
        end

	@doc """
		Kills process of GNumber. Parameter is pid of the GNumber process.
	"""
        def kill(pid) do
                GenServer.cast(pid, :kill)
        end
        
#Implementation

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
