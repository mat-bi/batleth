defmodule Clock do
    

    @doc """
        Starts a new thread to count time for adding records. Takes one parameter - pid of the writer.
        If succeeded, returns a tuple {:ok, pid}
        """
	def start_link() do
                
        	Task.start_link(fn() ->

                {:ok, pid_d} = DatabaseAccess.start_link(self())
                {:ok, pid_r} = BatteryReader.start_link(self())
                loop(pid_d, pid_r) end)
	end




    	defp loop(pid_d, pid_r) do
		send pid_d, {:get, :last_timestamp, self()}

		receive do
			{:ok, last_timestamp} -> 
				{ms, s, _} = :os.timestamp
				time_dif = ms * 1_000_000 + s - last_timestamp

				if time_dif >= 60 do
					IO.puts "Po >= 60"
					if time_dif > 60 do
						IO.puts "Po > 60"
						send pid_d, {:add, :nil, self()}
						receive do
							{:ok} -> :timer.sleep(0)
						end
					end
					
					IO.puts "przed send pid_r"
					send pid_r, {:read, self()}
					IO.puts "Wyślij"
					receive do
						{:ok, percentage, status, caller} ->
							send pid_d, {:add, %{status: status, pr: percentage}, self()}
							receive do
								{:ok} -> :timer.sleep(60000)
								{:error, :db} -> :not_implemented
							end

						_ -> :not_implemented
					end
                                        loop(pid_d, pid_r)
				else
					:timer.sleep(60000 - time_dif*1000)
					loop(pid_d, pid_r)
				end

			{:error, :db} -> :not_implemented_ale_bedzie
		end

        	receive do
			{:error, problem} -> :not_implemented
			_ -> :timer.sleep(60000)
			loop(pid_d, pid_r)
		end
    	end
    
end

