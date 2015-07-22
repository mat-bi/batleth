defmodule DatabaseAccess do

	@doc """
		Starts a databaseaccess. Takes two parameters - pids of the reader and the clock.
		If succeeded, returns a tuple {:ok, pid}  
	"""
	def start(pid_r, pid_c) do
		Task.start_link(fn() -> loop(pid_r, pid_c) end)
	end

	defp loop(pid_r, pid_c) do
		receive do
			{:get, :last_timestamp} -> 0
			_ -> :not_implemented
		end
	end
end 
