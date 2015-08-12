defmodule LastChange do
	use GenServer
	use Database
	
	@supervision_name :lastChange
	@reset Wpis.parse_wpis(-1,-1, -1)

	def start_link(_, _) do
		GenServer.start(__MODULE__,  @reset , [name: :lastChange])
	end

	def reset() do
		GenServer.cast(:lastChange, {:reset})
	end

	def get() do
		GenServer.call(@supervision_name, {:get})
	end

	def change(zmienna) do
		GenServer.cast(@supervision_name, {:change, zmienna})
	end

	def is_reset() do
		GenServer.call(@supervision_name, {:is_reset})
	end

	def handle_call({:is_reset}, _, last_ch) do
		if last_ch == @reset do
			{:reply, true, last_ch}
		else
			{:reply, false, last_ch}
		end
	end
	
	def handle_cast({:reset}, _) do
		{:noreply, @reset}
	end

	def handle_call({:get}, _, last_ch) do
		{:reply, last_ch, last_ch}
	end

	def handle_cast({:change, zmienna}, _) do
		{:noreply, zmienna}
	end

end
