defmodule Logging do
	@moduledoc """
		The module of the logger.
	"""	
	
	use GenServer

	defp opts() do
		[name: :logger]
	end

	def start_link(_, _) do
		GenServer.start_link(__MODULE__, [], opts)
	end
	#api
	@doc ~S"""
		Writes in the log files. The file is saved in path "/var/log/batleth/:year/:day.log"
		Example record: 30/07/2015 11:10:58 Database not present
		Possible errors:
			:no_db -> writes "Database not present"
			:bad_cmd -> writes "Bad command"

		Responds with {:ok}

		##Examples

		    iex> Logging.write(:no_db)
		    {:ok}

		    iex> Logging.write(:bad_cmd)
		    {:ok}
		"""
	def write(error) do
		GenServer.call(opts[:name], {:write, error})
	end

	#implementation
	defp reply() do
		{:reply, {:ok}, []}
	end

	defp fwrite(error) do
                unless File.exists?("/var/log/batleth/#{Time.year}") do
                        File.mkdir("/var/log/batleth/#{Time.year}")
                end
                {:ok, pid} = File.open("/var/log/batleth/#{Time.year}/#{Time.month}.log", [:append])
                unless IO.write(pid,Time.date_and_time <> " " <> error<>"\n") == :ok do
                        raise "Logger can't write to the file"
                end
                File.close(pid) 
	end
				
	def handle_call({:write, :no_db}, _, _) do
		fwrite("Database not present")
		reply
	end

	def handle_call({:write, :bad_cmd}, _, _) do
		fwrite("Bad command")
		reply
	end

end
