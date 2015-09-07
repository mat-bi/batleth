defmodule Batleth.Helpers do
	def integer_parse(p) do
		case Integer.parse(p) do
			{a, _} when is_integer(a) -> a
			_ -> 0
		end
	end
	
	def ceil_integer(i) do
		 i |> Float.ceil |> round
	end
	
	def date_to_timestamp(date) do
		{:ok, date} = date |> Timex.DateFormat.parse("%d %B, %Y", :strftime) 
		{mxs, s, _} = date |> Timex.Date.to_timestamp
		mxs*1_000_000+s
	end
	
	def timestamp_to_date(tmp, separator \\ ".") do
		{{year, month, day}, _} = Time.from_timestamp(tmp)
		Integer.to_string(day) <> separator <> Integer.to_string(month) <> separator <> Integer.to_string(year)
	end
	
	def timestamp_to_hour(tmp, separator \\ ":") do
		{_, {hour, minute, sec}} = tmp |> Time.from_timestamp
		(hour |> Integer.to_string) <> separator <>
		(minute |> Integer.to_string)
	end
end
