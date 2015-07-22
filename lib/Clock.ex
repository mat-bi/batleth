defmodule Clock do
    
    @doc """
        Starts a new thread to count time for adding records. Takes one parameter - pid of the writer.
        If succeed, returns a tuple {:ok, pid}
        
         """
	def start(pid) do
        	Task.start_link(fn() -> loop(pid) end)
	end

    	defp loop(pid) do
        	send pid, { self() }
		send pid, { :get, :last_timestamp }

		receive do
			{:ok, last_timestamp} -> 

				{ms, s, _} = :os.timestamp
				time_dif = ms * 1_000_000 + s - last_timestamp

				if time_dif >= 60 do
					{:add
				else
					:timer.sleep(60 - time_dif)
				end

			{:error} -> 

        	receive do
			
			{:error, problem} -> :not_implemented
			_ -> :timer.sleep(60000)
			loop(pid)
		end
    	end
    
end

