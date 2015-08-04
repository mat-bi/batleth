defmodule BatlethServer.PageView do
  use BatlethServer.Web, :view
  use Timex

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

  def timestamp_to_time(tms) do
    time = { div(tms, 1000000), rem(tms, 1000000), 0}
            |> Date.from(:timestamp)
  end

  def parse_time(tms) do
    tms = timestamp_to_time(tms)
    {:ok, time} = DateFormat.format(tms, "%H:%M", :strftime)
    time
  end

  def parse_date(tms) do
    tms = timestamp_to_time(tms)
    {:ok, time} = DateFormat.format(tms, "%Y/%m/%d", :strftime)
    time
  end

  def pages(pages_num) do
    Enum.to_list 1..pages_num
  end
end
