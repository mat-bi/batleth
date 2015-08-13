defmodule Batleth do
	use Application
	require Amnesia
	use Amnesia
	use Database

	def start(_,_) do
		
		Amnesia.start
                Database.wait

		
		{:ok, pid} = Task.start_link(fn -> 
		import Supervisor.Spec
		children = [
			worker(Logging, [[], [name: :logger]]),
			worker(DatabaseAccess, [[], [name: :base]]),
			worker(BatteryReader, [[], [name: :battery]]),
			worker(Clock, [[], [name: :clock]]),
			worker(Stat, [[], []]),
			worker(LastChange, [[],[]]),
			worker(DatabaseAccess.Prosta, [[],[]])
			]
		Supervisor.start_link(children, strategy: :one_for_all) 
		loop() end)

		{:ok, self()}
	end
	
	
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
					:timer.sleep(2000)
			end
			loop()

	end
end


