defmodule Batleth do
	use Application

	def start(_,_) do
		#require Amnesia
		#use Amnesia
		#use Database

		import Supervisor.Spec
		children = [
			worker(Logging, [[], [name: :logger]]),
			worker(DatabaseAccess, [[], [name: :base]]),
			worker(BatteryReader, [[], [name: :battery]]),
			worker(Clock, [[], [name: :clock]]),
			worker(Database, [[], [name: :sql]])
			]
		Supervisor.start_link(children, strategy: :one_for_one)
		#loop()
		{:ok, pid} = Task.start_link(fn -> loop() end)

		{:ok, self()}
	end
	
	
	def loop() do
			#Amnesia.start
			#Database.wait
			case Clock.read do
				{at, time_dif} when is_atom(at) and is_integer(time_dif) ->
					case at do
						:ok ->
							if time_dif > 60 do
								DatabaseAccess.add(nil)
							end
	
							{:ok, percentage, status} = BatteryReader.read
	
							DatabaseAccess.add(%{status: status, percentage: percentage})
							:timer.sleep(60000)	
						:wait -> 
							:timer.sleep(60000 - time_dif*1000)
						_ -> Logging.write(:bad_cmd)
							
					end
				_ -> Logging.write(:bad_cmd)
					:timer.sleep(2000)
			end
			#Amnesia.stop
			loop()

	end
end


