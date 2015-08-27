defmodule BatlethServer.Time do
  @moduledoc """
    Provides functions to convert Timex dates from and to 'timestamp' values stored in database.
  """
  use Timex

  def today do
    Date.now
    |> to_batleth_timestamp
  end

  def week_ago do
    Date.now
    |> Date.subtract(Time.to_timestamp(7, :days))
    |> to_batleth_timestamp
  end

  @doc """
  Converts Timex.Date object to timestamp used in batleth's database.
  """
  def to_batleth_timestamp(date) do
    date
    |> Date.to_timestamp
    |> to_batleth_time
  end

  #Converts Erlang timestamp to batleth timestamp.
  defp to_batleth_time({ms, s, _}) do
    ms * 1_000_000 + s
  end


  #Converts batleth timestamp to Timex Date object
  defp timestamp_to_time(tms) do
    { div(tms, 1000000), rem(tms, 1000000), 0}
    |> Date.from(:timestamp)
  end

  @doc """
  Parses batleth timestamp.
  """
  def parse_timestamp(tms, string) do
    tms = timestamp_to_time(tms)
    {:ok, time} = DateFormat.format(tms, string, :strftime)
    time
  end
end
