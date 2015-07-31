defmodule Logging do
	use GenServer

	defp opts() do
		[name: :logger]
	end

	def start_link(_, _) do
		GenServer.start(__MODULE__, [], opts)
	end

	def write(error) do
		GenServer.call(opts[:name], {:write, error})
	end
	defp reply() do
		{:reply, {:ok}, []}
	end

	defp fwrite(error) do
		File.write("/var/log/batleth/#{Time.month}.log", Time.date_and_time <> " " <> error<>"\n", [:append])
	end
				
	def handle_call({:write, :no_db}, _, _) do
		fwrite("Database not present")
		reply
	end

	def handle_call({:write, :bad_cmd}, _, _) do
		fwrite("Bad command")
		reply
	end

	def handle_call({:write, :works}, _, _) do
		fwrite("It works!")
		reply
	end
end
