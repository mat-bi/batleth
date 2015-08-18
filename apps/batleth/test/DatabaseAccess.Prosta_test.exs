defmodule Batleth.DatabaseAccess.ProstaTest do
	use ExUnit.Case, async: false

	test "Getting last record's timestamp" do
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: 2})
		assert DatabaseAccess.Prosta.getLast == 2
	end

	test "Getting list of records [Prosta] from timestamp to timestamp" do
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -22})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -32})
		Database.Prosta.add(%Database.Prosta{a: 2, b: 2, timestamp: -12})
		Database.Prosta.add(%Database.Prosta{a: 2, b: 2, timestamp: -35})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -6})

		assert DatabaseAccess.Prosta.get(-42, -22, :less) == [%Database.Prosta{a: -2, b: 2, timestamp: -32}, %Database.Prosta{a: -2, b: 2, timestamp: -22}]
		assert DatabaseAccess.Prosta.get(-42, -22, :greater) == [%Database.Prosta{a: 2, b: 2, timestamp: -35}]

	end
		
end
