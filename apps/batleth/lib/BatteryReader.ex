defmodule BatteryReader do
    use GenServer

    @supervision_name :battery
    @doc """
        Starts a battery reader. Takes one argument - pid of the writer.
	If succeeded, returns a tuple {:ok, pid}
	"""	
	def start_link(_, _) do    
		GenServer.start(__MODULE__,  [] , [name: :battery])
	end

	#api
	
	@doc """
		Reads the current battery status and percentage. Possible responses:
			{:ok, percentage, status}
			{:error, :bad_cmd} -> if there was an unknown error
		"""
	def read do
		GenServer.call(@supervision_name, {:read})
	end
	
	
	
	#Implementation

	def handle_call({:read}, _, _) do
				case File.read("/sys/class/power_supply/BAT1/status") do
					{:error, :enoent} -> 
						case File.read("/sys/class/power_supply/BAT0/status") do
							{:ok, status} -> status = parse_status(status)
							{:error, :enoent} -> status = parse_status("Not present\n")
						end
					{:ok, status} -> status = parse_status(status)
					_ ->  bad_cmd
						
				end

				case File.read("/sys/class/power_supply/BAT1/capacity") do
					{:error, :enoent} -> 
						case File.read("/sys/class/power_supply/BAT0/capacity") do
							{:error, :enoent} -> percentage = 0
					                {:ok, percentage} -> { percentage, _} = Integer.parse(percentage)
						end
			 		{:ok, percentage} -> { percentage, _} = Integer.parse(percentage)
					_ -> bad_cmd
				end
				{:reply, { :ok, percentage, status}, []}
			
	end

	defp parse_status(status) do
		case status do
			"Charging\n" -> 0
			"Discharging\n" -> 1
			"Unknown\n" -> 2
			"Full\n" -> 3
			"Not present\n" -> 4
			_ -> -1
		end
	end

	defp bad_cmd() do
		Logging.write(:bad_cmd)
		{:reply, {:error, :bad_command}, []}
	end

end
