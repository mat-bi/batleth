defmodule Stat do
	@moduledoc """
		The statistical module.
	"""
	use GenServer
	use Database

	@supervision_name :stat

	def start_link(_, _) do
		GenServer.start_link(__MODULE__,  [] , [name: :stat])
	end

	def run(wpis, tmp) do		
		GenServer.cast(@supervision_name, {:run, wpis, tmp})
	end
        
        def average(from, to, status \\:less) do
                GenServer.call(@supervision_name, {:average, from, to, status})
        end

        def handle_call({:average, from, to, status}, _, _) do
                w = DatabaseAccess.Prosta.get(from, to, status)
                {:reply, average(w), []}
        end

        def average([]) do
                0
        end

        def average(w) do
                {:ok, s} = GNumber.start_link
                Enum.each(w, fn(x) ->
                    GNumber.add(s, 100/x.a)
                end)

                av = GNumber.get(s)
                GNumber.kill(s)

                -av/(length w)
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
				DatabaseAccess.WpisChanges.add(wpis.timestamp, wpis.status)
			wpis.status != LastChange.get.status->
				DatabaseAccess.WpisChanges.add(wpis.timestamp, wpis.status)
				
				if length(wp) >= 5 do
					case make(wp) do
				    		a when is_map(a) -> DatabaseAccess.Prosta.add(a)
				    		LastChange.change(wpis)
				                        
				    		_ ->LastChange.change(wpis)
					end
				end
				
			Time.timestamp-LastChange.get.timestamp >= 600 and (r == false or Time.timestamp - DatabaseAccess.Prosta.getLast >= 600) ->

                        cond do 
			        wpis.pr == LastChange.get.pr and length(wp) >= 10 ->
				        mp = %{a: 0, b: wpis.pr}
				        DatabaseAccess.Prosta.add(mp)
			        length(wp) >= 5  ->
				        mp = make(wp)
				        DatabaseAccess.Prosta.add(mp)
			        true ->
			end 
			true ->
		end
                {:noreply, []}	
	end

	
	@doc """
		Makes some statistics for the given records: calculates expected value of the timestamp (average timestamp),
		expected value of the percentage (average percentage), expected value of the timestamp and the percentage (average (timestamp*percentage)),
		variance of the timestamp, variance of the percentage, covariance of the timestamp and the percentage,
		correlation of the timestamp and the percentage and, finally, simple linear regression.

		Returns a and b values from formula of simple linear regression: y = ax + b or - in case of error, a tuple {:error, :dividing_by_zero}	
	"""
        def make(a) do
                
		[head|_] = a
		l = length a
		{:ok, average_timestamp } = GNumber.start_link()
		{:ok, average_percentage } = GNumber.start_link()
		{:ok, average} = GNumber.start_link
		Enum.each(a, fn(x) -> GNumber.add(average_timestamp, x.timestamp-head.timestamp)
				      GNumber.add(average_percentage, x.pr)
				      GNumber.add(average, (x.timestamp-head.timestamp)*x.pr) end)
		tmp = GNumber.get(average_timestamp)
		pr = GNumber.get(average_percentage)
                av = GNumber.get(average)

		GNumber.kill(average_timestamp)
		GNumber.kill(average_percentage)
		GNumber.kill(average_percentage)

		average_timestamp = tmp/l
		average_percentage = pr/l
		average = av/l

		{:ok, var_timestamp} = GNumber.start_link()
		{:ok, var_percentage} = GNumber.start_link()

		Enum.each(a, fn(x) -> GNumber.add(var_timestamp, (x.timestamp-head.timestamp-average_timestamp)*(x.timestamp-head.timestamp-average_timestamp)/l)
				      GNumber.add(var_percentage,(x.pr-average_percentage)*(x.pr-average_percentage)) end)

		tmp = GNumber.get(var_timestamp)
		pr = GNumber.get(var_percentage)

                GNumber.kill(var_timestamp)
		GNumber.kill(var_percentage)

		var_timestamp = tmp
		var_percentage = pr/l

		cov = average-average_timestamp*average_percentage
		vx = :math.sqrt(var_timestamp*var_percentage)
		if vx != 0 and var_timestamp != 0 do 
		        cor = cov/vx
		        a = cor*:math.sqrt(var_percentage/var_timestamp)
		        b = average_percentage-a*(average_timestamp+head.timestamp)
		        %{a: a, b: b}
		else
		        {:error, :dividing_by_zero}
                end
	end
	
	
	
end
