defmodule Time do

	def timestamp(format \\ :sec) do
		{ms, s, mss} = :os.timestamp
		case format do
			:sec ->
				ms * 1_000_000 + s
			:msec ->
				ms*1_000_000_000 +1000*s+mss
			_ -> nil
		end
	end
	
	defp local_time do
		:calendar.local_time()
	end

	def date_and_time(separator_date \\ "/", separator_time \\ ":") do
		date(separator_date) <> " " <> time(separator_time)
	end
		

	def date(separator_date \\ "/") do
		day<>separator_date<>month<>separator_date<>year
	end

	def time(separator_time \\ ":") do
		hour<>separator_time<>minute<>separator_time<>second
	end

	defp parse_zero(l) do
		if(l >= 0 && l <= 9) do
			"0" <> Integer.to_string l
		else
			Integer.to_string l
		end
	end
		

	def month do
		{{_, m, _}, {_,_,_}} = local_time
		parse_zero(m)
	end

	def day do
		{{_, _, d}, {_, _, _}} = local_time
		parse_zero(d)
	end

	def year do
		{{y, _, _}, {_, _, _}} = local_time
		Integer.to_string y
	end

	def hour do
		{{_, _, _}, {h, _, _}} = local_time
		parse_zero(h)
	end

	def minute do
		{{_, _, _}, {_, m, _}} = local_time
		parse_zero(m)
	end

	def second do
		{{_, _, _}, {_, _, s}} = local_time
		parse_zero(s)
	end

	p = {{1970, 1, 1}, {0, 0, 0}}
  	@p :calendar.datetime_to_gregorian_seconds(p)
  	def from_timestamp(timestamp) do
		timestamp |> +(@p) |> :calendar.gregorian_seconds_to_datetime
  	end
end
