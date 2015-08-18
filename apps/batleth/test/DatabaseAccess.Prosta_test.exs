defmodule Batleth.DatabaseAccess.ProstaTest do
	use ExUnit.Case, async: false

	test "Getting last record's timestamp" do
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: 2})
		assert DatabaseAccess.Prosta.getLast == 2
	end

	test "Getting list of records [Prosta] from timestamp to timestamp" do
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -22})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -32})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -12})

		assert DatabaseAcces.Prosta.get(-22, -42) == [Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -32}, Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -22}]
	end
		
end
