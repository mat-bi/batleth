defmodule BatlethServer.PageView do
  use BatlethServer.Web, :view

  def parse_status(status) do
    case status do
      0 -> "Charging"
      1 -> "Discharging"
      2 -> "Unknown"
      3 -> "Full"
      4 -> "Not present"
      _ -> "Error"
    end
  end

  def parse_time(tms) do
    BatlethServer.Time.parse_timestamp(tms, "%H:%M")
  end

  def parse_date(tms) do
    BatlethServer.Time.parse_timestamp(tms, "%Y/%m/%d")
  end

  def pages(pages_num) do
    Enum.to_list 1..pages_num
  end
end
