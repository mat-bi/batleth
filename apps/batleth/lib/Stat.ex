defmodule Stat do
	use GenServer
	use Database

	@supervision_name :stat

	def start_link(_, _) do
		GenServer.start(__MODULE__,  [] , [name: :stat])
	end

	def run(wpis, tmp) do #Jakie argumenty będzie przyjmować?
		#Warunki startu - zmiana poziomu naładowania baterii.
		
		GenServer.call(@supervision_name, {:run, wpis, tmp})
	end

	#Funkcje statystyczne powinny znaleźć się tutaj.

	def handle_call({:run, wpis, tmp}, _, _) do
		if LastChange.get().status != wpis.status or tmp == true or LastChange.is_reset() do
			LastChange.change(wpis)
		end 
                {:reply, :ok, []}
	end
        defp make() do
		a = DatabaseAccess.get(0,0)
		[head|tail] = a
		l = length a
		{:ok, average_timestamp } = GNumber.start_link()
		{:ok, average_percentage } = GNumber.start_link()
		{:ok, average} = GNumber.start_link
		Enum.each(a, fn(x) -> send average_timestamp, {:add, x.timestamp-head.timestamp}
				      send average_percentage, {:add, x.pr}
				      send average, {:add, (x.timestamp-head.timestamp)*x.pr} end)
		send average_timestamp, {:get, self()}
		receive do
			tmp -> tmp=tmp
		end

		send average_percentage, {:get, self()}
		receive do
			pr -> pr = pr
		end

		send average, {:get, self()}
		receive do
			av -> av = av
		end

		send average_timestamp, {:kill}
		send average_percentage, {:kill}
		send average_percentage, {:kill}

		average_timestamp = tmp/l
		average_percentage = pr/l
		average = av/l

		{:ok, var_timestamp} = GNumber.start_link()
		{:ok, var_percentage} = GNumber.start_link()

		Enum.each(a, fn(x) -> send var_timestamp, {:add, (x.timestamp-head.timestamp-average_timestamp)*(x.timestamp-head.timestamp-average_timestamp)/l}
				      send var_percentage, {:add, (x.pr-average_percentage)*(x.pr-average_percentage)} end)

		send var_timestamp, {:get, self()}
		receive do
			tmp -> tmp = tmp
		end

		send var_percentage, {:get, self()}
		receive do
			pr -> pr = pr
		end

		send var_timestamp, {:kill}
		send var_percentage, {:kill}

		var_timestamp = tmp
		var_percentage = pr/l

		cov = average-average_timestamp*average_percentage
		cor = cov/(:math.sqrt(var_timestamp*var_percentage))
		a = cor*:math.sqrt(var_percentage/var_timestamp)
		b = average_percentage-a*(average_timestamp+head.timestamp)

		{:reply, {-b/a}, []}
			
	end
	
	
	
end
