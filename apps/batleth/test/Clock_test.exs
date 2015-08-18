defmodule Batleth.ClockTest do
	use ExUnit.Case, async: false

	use Amnesia

	setup do
		Amnesia.start
		Database.wait
	end

	test "Retrieving time difference" do
		DatabaseAccess.delete(-200, 99999999999999999999999999)
		assert Clock.read == {:ok, Time.timestamp}
		
		Amnesia.transaction do
			Database.Wpis.add(%Database.Wpis{timestamp: Time.timestamp - 10, pr: 0, status: 0})
		end

		assert Clock.read == {:wait, 10}

		DatabaseAccess.delete(-200, 99999999999999999999999999)
		
		Amnesia.transaction do
			Database.Wpis.add(%Database.Wpis{timestamp: Time.timestamp - 60, pr: 0, status: 0})
		end

		assert Clock.read == {:ok, 60}

		DatabaseAccess.delete(-200, 999999999999999999999999999999)

		Amnesia.transaction do
			Database.Wpis.add(%Database.Wpis{timestamp: Time.timestamp - 70, pr: 0, status: 0})
		end
		
		assert Clock.read == {:ok, 70}
	end
end
