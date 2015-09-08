defmodule Time do
	@moduledoc """
		A module with very useful time functions.
	"""
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

	@doc """
		Returns current date and time with a given or default separator.
	"""
	def date_and_time(separator_date \\ "/", separator_time \\ ":") do
		date(separator_date) <> " " <> time(separator_time)
	end
		
	@doc """
		Returns current date with a given or default separator.
	"""
	def date(separator_date \\ "/") do
		day<>separator_date<>month<>separator_date<>year
	end

	@doc """
		Returns current time with a given or default separator.
	"""
	def time(separator_time \\ ":") do
		hour<>separator_time<>minute<>separator_time<>second
	end

	def date_to_timestamp(date) do
		{:ok, date} = date |> Timex.DateFormat.parse("%d %B, %Y", :strftime) 
		{mxs, s, _} = date |> Timex.Date.to_timestamp
		mxs*1_000_000+s
	end
	
	def timestamp_to_date(tmp, separator \\ ".") do
		{{year, month, day}, _} = Time.from_timestamp(tmp)
		(day |> parse_zero) <> separator <> (month |> parse_zero) <> separator <> Integer.to_string(year)
	end
	
	def timestamp_to_hour(tmp, separator \\ ":") do
		{_, {hour, minute, sec}} = tmp |> Time.from_timestamp
		(hour |> parse_zero) <> separator <>
		(minute |> parse_zero)
	end

	@doc """
		Auxiliary functions.
	"""
	def parse_zero(l) do
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


	@doc """
		Converts a timestamp to human format of date and time.
	"""
	p = {{1970, 1, 1}, {0, 0, 0}}
  	@p :calendar.datetime_to_gregorian_seconds(p)
  	def from_timestamp(timestamp) do
		timestamp |> +(@p) |> :calendar.gregorian_seconds_to_datetime
  	end
end
