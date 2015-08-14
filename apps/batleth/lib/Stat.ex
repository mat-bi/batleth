defmodule Stat do
	use GenServer
	use Database

	@supervision_name :stat

	def start_link(_, _) do
		GenServer.start(__MODULE__,  [] , [name: :stat])
	end

	def run(wpis, tmp) do		
		GenServer.cast(@supervision_name, {:run, wpis, tmp})
	end

	def handle_cast({:run, wpis, tmp}, _) do
		wp = DatabaseAccess.lastWpises
                r = if Prosta.getLast == nil do
                        false
                else
                        true
                end
              
		cond do
			tmp == true or LastChange.is_reset ->
				LastChange.change(wpis)
			wpis.status != LastChange.get.status and length(wp) >= 5 ->
				mp = make(wp)
				DatabaseAccess.Prosta.add(mp)
				LastChange.change(wpis)
			wpis.pr == LastChange.get.pr and length(wp) >= 10 ->
				mp = %{a: 0, b: wpis.pr}
				DatabaseAccess.Prosta.add(mp)
			length(wp) >= 5 and Time.timestamp-LastChange.get.timestamp >= 600 and (r == false or Time.timestamp - DatabaseAccess.Prosta.getLast >= 600) ->
				mp = make(wp)
				DatabaseAccess.Prosta.add(mp)
			true -> 
		end
                {:noreply, []}	
	end

	
	@doc """
		Makes some statistics for the given records: calculates expected value of the timestamp (average timestamp),
		expected value of the percentage (average percentage), expected value of the timestamp and the percentage (average (timestamp*percentage)),
		variance of the timestamp, variance of the percentage, covariance of the timestamp and the percentage,
		correlation of the timestamp and the percentage and, finally, simple linear regression.

		Returns a and b values from formula of simple linear regression: y = ax + b.	
	"""
        defp make(a) do
                
		[head|_] = a
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

		%{a: a, b: b}
			
	end
	
	
	
end
