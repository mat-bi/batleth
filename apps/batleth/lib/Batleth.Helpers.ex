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
end
