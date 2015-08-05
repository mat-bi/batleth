defmodule BatlethServer.PageControllerTest do
  use BatlethServer.ConnCase
  use Hound.Helpers
  import Mock

  hound_session

  test "Logo is shown" do
    navigate_to("/")

    element_id = find_element(:id, "logo-container")
    assert visible_text(element_id) == "Bat'leth"
  end

  test "With no data current battery level is unknown" do
    with_mock DatabaseAccess, [:passthrough],
    [handle_call: fn(_, _, _) -> {:reply, :badarg, []} end] do
    navigate_to("/")
    element_id = find_element(:id, "battery-level")
    assert visible_text(element_id) == "Unknown %"
    end
  end

  test "With data current battery level is shown" do
    with_mock DatabaseAccess, [:passthrough],
    [handle_call: fn
        ({:get, :last}, _, _) -> {:reply, %{timestamp: 1438332658, status: 1, pr: "20"}, []}
        ({:get, _, _}, _, _) -> {:reply, [%{timestamp: 1438332658, status: 1, pr: "20"}], []}
    end] do
    navigate_to("/")
    element_id = find_element(:id, "battery-level")
    assert visible_text(element_id) == "20 %"
    end
  end

  test "Data is paginated in batches of ten" do
     with_mock DatabaseAccess, [:passthrough],
     [handle_call: fn
        ({:get, :last}, _, _) -> {:reply, %{timestamp: 1438332658, status: 1, pr: "20"}, []}
        ({:get, _, _}, _, _) -> {:reply,
           [%{pr: 92, status: 1, timestamp: 1438332598},
            %{pr: 92, status: 1, timestamp: 1438332658},
            %{pr: 90, status: 1, timestamp: 1438332718},
            %{pr: 90, status: 1, timestamp: 1438332898},
            %{pr: 88, status: 1, timestamp: 1438332958},

            %{pr: 88, status: 1, timestamp: 1438333018},
            %{pr: 88, status: 1, timestamp: 1438333078},
            %{pr: 86, status: 1, timestamp: 1438333138},
            %{pr: 86, status: 1, timestamp: 1438333198},
            %{pr: 68, status: 1, timestamp: 1438335294},
            %{pr: 68, status: 1, timestamp: 1438335354},
            %{pr: 66, status: 1, timestamp: 1438335414},
            %{pr: 66, status: 1, timestamp: 1438335474},
            %{pr: 66, status: 1, timestamp: 1438335534},
            %{pr: 66, status: 1, timestamp: 1438335594},

            %{pr: 66, status: 1, timestamp: 1438335654},
            %{pr: 64, status: 1, timestamp: 1438335714},
            %{pr: 64, status: 1, timestamp: 1438335774},
            %{pr: 64, status: 1, timestamp: 1438335834},
            %{pr: 64, status: 1, timestamp: 1438335894},
            %{pr: 62, status: 1, timestamp: 1438336048},
            %{pr: 58, status: 1, timestamp: 1438336626},
            %{pr: 58, status: 1, timestamp: 1438336698},
            %{pr: 56, status: 1, timestamp: 1438336881},
            %{pr: 54, status: 1, timestamp: 1438337017},

            %{pr: 54, status: 1, timestamp: 1438337077},
            %{pr: 54, status: 1, timestamp: 1438337186},
            %{pr: 54, status: 1, timestamp: 1438337246},
            %{pr: 52, status: 1, timestamp: 1438337306},
            %{pr: 52, status: 1, timestamp: 1438337378},
            %{pr: 52, status: 1, timestamp: 1438337438},
            %{pr: 52, status: 1, timestamp: 1438337498},
            %{pr: 50, status: 1, timestamp: 1438337558},
            %{pr: 50, status: 1, timestamp: 1438337618},
            %{pr: 50, status: 1, timestamp: 1438337678},

            %{pr: 50, status: 1, timestamp: 1438337738},
            %{pr: 50, status: 1, timestamp: 1438337798},
            %{pr: 48, status: 1, timestamp: 1438337858},
            %{pr: 48, status: 1, timestamp: 1438337918},
            %{pr: 48, status: 1, timestamp: 1438337978},
            %{pr: 48, status: 1, timestamp: 1438338038},
            %{pr: 46, status: 1, timestamp: 1438338098},
            %{pr: 44, status: 1, timestamp: 1438338407},
            %{pr: 44, status: 1, timestamp: 1438338467},
            %{pr: 44, status: 1, timestamp: 1438338527}],
          []}
    end] do
    navigate_to("/")
    table = find_element(:class, "table-container")
    list = find_all_within_element(table, :tag, "tr")
    # 11 because table header is counted as well
    assert (Enum.count list) == 11
    assert visible_text(Enum.at(list, 1)) =~ "2015/07/31"
    assert visible_text(Enum.at(list, 1)) =~ "10:28"

    #Go to another page in pagination
    navigate_to("/?current_page=3")
    table = find_element(:class, "table-container")
    list = find_all_within_element(table, :tag, "tr")
    assert (Enum.count list) == 11
    assert visible_text(Enum.at(list, 1)) =~ "2015/07/31"
    assert visible_text(Enum.at(list, 1)) =~ "10:03"
    end
  end

  test "With no data pagination isn't shown" do
    with_mock DatabaseAccess, [:passthrough],
    [handle_call: fn(_, _, _) -> {:reply, :badarg, []} end] do
    navigate_to("/")
    assert find_all_elements(:tag, "ul") == []
    end
  end
end
