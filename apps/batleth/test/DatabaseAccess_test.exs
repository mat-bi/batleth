defmodule Batleth.DatabaseAccessTest do
	use ExUnit.Case, async: false
        require Amnesia
        use Amnesia
	
    setup do
        Amnesia.start
        Database.wait

    end
    
    test "Retrieving the last record" do
        DatabaseAccess.delete(-200,999999999999999999)
        {:ok, percentage, status} = BatteryReader.read()
        DatabaseAccess.add(%{status: status, pr: percentage})
        assert DatabaseAccess.getLast(1) == [%Database.Wpis{pr: percentage, status: status, timestamp: Time.timestamp}]
    end

    test "Retrieving from the empty database" do
           DatabaseAccess.delete(-200,999999999999999999)
           assert DatabaseAccess.getLast(1)  == [nil]
    end

    test "Deleting a record" do
        DatabaseAccess.delete(-200,999999999999999999)
	DatabaseAccess.add(%{status: -3, pr: -43})
	Time.timestamp |> DatabaseAccess.del
        assert DatabaseAccess.get(Time.timestamp) == nil
    end

    test "Getting records from timestamp to timestamp" do
	DatabaseAccess.delete(-200,999999999999999999)
	Amnesia.transaction do
		%Database.Wpis{ pr: -3, timestamp: -3, status: -64 } |> Database.Wpis.add
		%Database.Wpis{ pr: -4, timestamp: -4, status: -4 } |> Database.Wpis.add
		%Database.Wpis{ pr: -32, timestamp: -32, status: -32 } |> Database.Wpis.add
	end

	assert DatabaseAccess.get(-32,-3) == [%Database.Wpis{ pr: -32, timestamp: -32, status: -32}, %Database.Wpis{ pr: -4, timestamp: -4, status: -4 }, %Database.Wpis{ pr: -3, timestamp: -3, status: -64 }]
    end

	test "Getting the record with the given timestamp" do
		DatabaseAccess.delete(-200,999999999999999999)
		Amnesia.transaction do	
			Database.Wpis.add(%Database.Wpis{pr: -34, timestamp: 0, status: -32})
		end
		assert DatabaseAccess.get(0) == %Database.Wpis{pr: -34, timestamp: 0, status: -32}	
	end

	test "Getting n last Wpises" do
		DatabaseAccess.delete(-200,999999999999999999)
		LastChange.change(%Database.Wpis{pr: 0, status: 0, timestamp: 0})
		Amnesia.transaction do
			%Database.Wpis{pr: 0, status: 0, timestamp: Time.timestamp-2} |> Database.Wpis.add
			%Database.Wpis{pr: 2, status: 0, timestamp: Time.timestamp-3} |> Database.Wpis.add
			%Database.Wpis{pr: 4, status: 0, timestamp: Time.timestamp-4} |> Database.Wpis.add
			%Database.Wpis{pr: 6, status: 0, timestamp: Time.timestamp-5} |> Database.Wpis.add
			%Database.Wpis{pr: 8, status: 0, timestamp: Time.timestamp-6} |> Database.Wpis.add
		end

		assert DatabaseAccess.getLast(2) == [%Database.Wpis{pr: 2, status: 0, timestamp: Time.timestamp-3}, %Database.Wpis{pr: 0, status: 0, timestamp: Time.timestamp-2} ]
		assert DatabaseAccess.getLast(0) == []
		assert DatabaseAccess.getLast(5) == [%Database.Wpis{pr: 8, status: 0, timestamp: Time.timestamp-6},
						     %Database.Wpis{pr: 6, status: 0, timestamp: Time.timestamp-5},
						     %Database.Wpis{pr: 4, status: 0, timestamp: Time.timestamp-4},
						     %Database.Wpis{pr: 2, status: 0, timestamp: Time.timestamp-3},
						     %Database.Wpis{pr: 0, status: 0, timestamp: Time.timestamp-2}
						     ]
		assert DatabaseAccess.getLast(6) == DatabaseAccess.getLast(5)
	end

	test "Adding a record" do
		DatabaseAccess.delete(-200,999999999999999999)
		DatabaseAccess.add(%{status: 0, pr: 0})
		assert DatabaseAccess.get(Time.timestamp) == %Database.Wpis{pr: 0, status: 0, timestamp: Time.timestamp}
	end

	test "Retrieving records with the given status" do
		DatabaseAccess.delete(-200,999999999999999999)
		Amnesia.transaction do
			%Database.Wpis{pr: 0, status: 0, timestamp: 0} |> Database.Wpis.add
			%Database.Wpis{pr: 2, status: 2, timestamp: 3} |> Database.Wpis.add
			%Database.Wpis{pr: 4, status: 2, timestamp: 4} |> Database.Wpis.add
			%Database.Wpis{pr: 6, status: 4, timestamp: 5} |> Database.Wpis.add
			%Database.Wpis{pr: 8, status: 3, timestamp: 6} |> Database.Wpis.add
		end

		assert DatabaseAccess.get(0,9,0) == [%Database.Wpis{pr: 0, status: 0, timestamp: 0}]
		assert DatabaseAccess.get(0,9,2) == [%Database.Wpis{pr: 2, status: 2, timestamp: 3}, %Database.Wpis{pr: 4, status: 2, timestamp: 4}]
		assert DatabaseAccess.get(0,9,5) == DatabaseAccess.get(0,9,6) 
		assert DatabaseAccess.get(0,9,5) == []
	end

	test "Deleting records with timestamp in <from, to>" do
		DatabaseAccess.delete(-200,999999999999999999)
		Amnesia.transaction do
			%Database.Wpis{pr: 0, status: 0, timestamp: 0} |> Database.Wpis.add
			%Database.Wpis{pr: 2, status: 2, timestamp: 3} |> Database.Wpis.add
			%Database.Wpis{pr: 4, status: 2, timestamp: 4} |> Database.Wpis.add
			%Database.Wpis{pr: 6, status: 4, timestamp: 5} |> Database.Wpis.add
			%Database.Wpis{pr: 8, status: 3, timestamp: 6} |> Database.Wpis.add
		end

		DatabaseAccess.delete(3,5)
		assert DatabaseAccess.get(0,9) == [%Database.Wpis{pr: 0, status: 0, timestamp: 0}, %Database.Wpis{pr: 8, status: 3, timestamp: 6}]
		
		DatabaseAccess.delete(0,9)
		assert DatabaseAccess.get(0,9) == []
	end

	test "Getting last timestamp" do
		DatabaseAccess.delete(-200,999999999999999999)
		DatabaseAccess.add(%{status: 0, pr: 0})

		assert DatabaseAccess.get(:last_timestamp) == {:ok, Time.timestamp}
	end
end
