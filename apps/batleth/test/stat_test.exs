defmodule Batleth.StatTest do
    use ExUnit.Case


    test "Returning a, b of regression" do
        assert Stat.make([%Database.Wpis{ pr: 56, status: nil, timestamp: 1234500}, %Database.Wpis{ pr: 55, status: nil, timestamp: 1234560}, %Database.Wpis{ pr: 54, status: nil, timestamp: 1234620}]) == %{a: -0.016666666666666666, b: 20631.0}

    end


    test "Returning average" do
        assert Stat.average([]) == 0.0
        assert Stat.average([%Database.Prosta{a: -0.5, b: 34567890, timestamp: 34567890}, %Database.Prosta{a: -0.25, b: 345678590, timestamp: 345678950}]) == 300.0
    end

end

