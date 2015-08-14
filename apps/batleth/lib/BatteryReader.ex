defmodule BatteryReader do
    @moduledoc """
	A module to read and return the current battery status.
	"""
 

    use GenServer
    @supervision_name :battery
    @doc """
        Starts a battery reader - GenServer.
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
		Status is an integer:
			0 -> charging
			1 -> discharging
			2 -> unknown
			3 -> full
			4 -> not present (percentage is 0)
			-1 -> an error
		"""
	def read do
		GenServer.call(@supervision_name, {:read})
	end
	
	
	
	#Implementation
	@doc """
		Handles a call {:read}. Reads the battery status from files and returns {:ok, percentage, status}. 
		If there was an unknown error, logs it to the log files and returns {:error, :bad_command}.

		Example:
			iex> BatteryReader.read
			{:ok, 52, 0}
	"""

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

	@doc ~S"""
		Parses a battery status from string to integer.

		##Examples
		
		iex> BatteryReader.parse_status("Charging\n")
		0
	"""
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
