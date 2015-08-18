defmodule Batleth.DatabaseAccess.ProstaTest do
	use ExUnit.Case, async: false

	test "Getting last record's timestamp" do
		DatabaseAccess.Prosta.delete(-9999999999999999999, 999999999999999999999999)
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: 2})
		assert DatabaseAccess.Prosta.getLast == 2
	end

	test "Getting list of records [Prosta] from timestamp to timestamp" do
		DatabaseAccess.Prosta.delete(-9999999999999999999, 999999999999999999999999)
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -22})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -32})
		Database.Prosta.add(%Database.Prosta{a: 2, b: 2, timestamp: -12})
		Database.Prosta.add(%Database.Prosta{a: 2, b: 2, timestamp: -35})
		Database.Prosta.add(%Database.Prosta{a: -2, b: 2, timestamp: -6})
		Database.Prosta.add(%Database.Prosta{a: -0, b: 2, timestamp: -8})

		assert DatabaseAccess.Prosta.get(-42, -22, :less) == [%Database.Prosta{a: -2, b: 2, timestamp: -32}, %Database.Prosta{a: -2, b: 2, timestamp: -22}]
		assert DatabaseAccess.Prosta.get(-42, -22, :greater) == [%Database.Prosta{a: 2, b: 2, timestamp: -35}]
		assert DatabaseAccess.Prosta.get(-12, -5, :equal) == [%Database.Prosta{a: 0, b: 2, timestamp: -8}]
	end

	test "Adding a record 'Prosta' to the database" do
		DatabaseAccess.Prosta.delete(-9999999999999999999, 999999999999999999999999)
		assert DatabaseAccess.Prosta.add(%Database.Prosta{a: -0.88, b: 2.44, timestamp: -122}) == {:ok}
	end
		
end
