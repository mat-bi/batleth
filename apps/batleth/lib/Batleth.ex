defmodule Batleth do
	@moduledoc """
		The main module of batleth backend.
	"""
	
	require Amnesia
	use Amnesia
	use Database
        @doc """
		Starts the whole application.
		
		Example
			iex> Batleth.start_link([], [])
			{:ok, #PID<0.586.0>}
	"""
	def start_link(_, _) do
		Task.start_link(fn -> loop() end)
	end
	
	
	@doc """
		A loop function. Firstly, it gets the last timestamp from the database. 
		Then makes a decision, whether add a record to the database or go to sleep. 
		If a record is added, it runs Stat module and goes to sleep for a minute.
	"""
	def loop() do
			case Clock.read do
				{at, time_dif} when is_atom(at) and is_integer(time_dif) ->
					case at do
						:ok ->
							{:ok, percentage, status} = BatteryReader.read
							DatabaseAccess.add(%{status: status, pr: percentage})
                                                        [a] = DatabaseAccess.getLast(1)
							Stat.run(a, if time_dif > 60 do true else false end)
							:timer.sleep(60000)	

						:wait -> 
							:timer.sleep(60000 - time_dif*1000)

						_ -> Logging.write(:bad_cmd)
							
					end
				_ -> Logging.write(:bad_cmd)
				     raise "Bad command"
					:timer.sleep(20)
			end
			loop()

	end
end


