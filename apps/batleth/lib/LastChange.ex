defmodule LastChange do
	@moduledoc """
		A module that saves first record 'Wpis' of last status after status change 
		or after break of the application working.
	"""


	use GenServer
	use Database
	
	@supervision_name :lastChange
	@reset Wpis.parse_wpis(-1,-1, -1)


#API

	@doc """
		Starts LastChange's GenServer.
	"""
	def start_link(_, _) do
		GenServer.start_link(__MODULE__,  @reset , [name: :lastChange])
	end

	@doc """
		Resets LastChange - sets value of status, timestamp and pr to -1.
	"""
	def reset() do
		GenServer.cast(:lastChange, {:reset})
	end

	@doc """
		Returns 'Wpis' struct that is value of LastChange.
	"""
	def get() do
		GenServer.call(@supervision_name, {:get})
	end

	@doc """
		Changes LastChange's value and sets its parameters to parameters of 'zmienna'.
	"""
	def change(zmienna) do
		GenServer.cast(@supervision_name, {:change, zmienna})
	end

	@doc """
		A logical function that checks if LastChange is reset: status == -1, pr == -1 and timestamp == -1.
	"""
	def is_reset() do
		GenServer.call(@supervision_name, {:is_reset})
	end


#Implementation

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
