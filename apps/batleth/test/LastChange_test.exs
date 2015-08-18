defmodule Batleth.LastChangeTest do
    	use ExUnit.Case, async: false
	test "Resetting the module" do
		LastChange.reset
		assert LastChange.is_reset == true
	end

	test "Setting a new Wpis and getting it" do
		LastChange.change(%Database.Wpis{ pr: 0, status: 0, timestamp: 0})
		assert LastChange.get == %Database.Wpis{pr:  0, status: 0, timestamp: 0}
	end
end
