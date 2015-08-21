defmodule BatlethServer.FilteringTest do
  use BatlethServer.ConnCase
  use Hound.Helpers
  use Timex
  import Mock

  hound_session

  test "it should set current date as ending date for filter if not provided" do
    with_mock DatabaseAccess, [:passthrough],
    [handle_call: fn
        ({:get, :last}, _, _) -> {:reply, single_record, []}
        ({:get, from, to}, _, _) -> {:reply, filter(data, from, to), []} end] do

        navigate_to "/"
        list = find_all_elements(:tag, "tr")
        assert Enum.count list == 2
        #assert (list |> Enum.at(1) |> find_element |> visible_text) =~ DateFormat.format(Date.now, "%Y/%m/%d", :strftime)
        end
  end


  defp single_record do
    %{timestamp: time_minus(20, :mins), status: 1, pr: 20}
  end

  defp data do
    [%{timestamp: time_minus(20, :mins), status: 1, pr: 10},
      %{timestamp: time_plus(2, :days)}]
  end

  defp time_minus(num, atom) do
    Date.now
    |> Date.subtract(Time.to_timestamp(num, atom))
    |> BatlethServer.Time.to_batleth_timestamp
  end

  defp time_plus(num, atom) do
    Date.now
    |> Date.add(Time.to_timestamp(num, atom))
    |> BatlethServer.Time.to_batleth_timestamp
  end

  defp filter(data, from, to) do
    Enum.filter(data, fn(x) -> x.timestamp > from and x.timestamp < to end)
  end
end
