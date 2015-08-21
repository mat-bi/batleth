defmodule BatlethServer.PageViewTest do
  use BatlethServer.ConnCase, async: true
  alias BatlethServer.PageView

  test "status is properly parsed" do
    assert (PageView.parse_status 0) == "Charging"
    assert (PageView.parse_status 1) == "Discharging"
    assert (PageView.parse_status 2) == "Unknown"
    assert (PageView.parse_status 3) == "Full"
    assert (PageView.parse_status 4) == "Not present"
    assert (PageView.parse_status 5) == "Error"
    assert (PageView.parse_status 49029) == "Error"
    assert (PageView.parse_status "Charging") == "Error"
  end

  test "time and date are parsed" do
    timestamp = 1438332598
    assert PageView.parse_time(timestamp) == "08:49"
    assert PageView.parse_date(timestamp) == "2015/07/31"
  end
end
