defmodule BatlethServer.PageController do
  use BatlethServer.Web, :controller

  @per_page 10

  def index(conn, params) do
    last = GenServer.call(:base, {:get, :last})
    records_list = GenServer.call(:base, {:get, 1438207200, 1438580010})
    pages_num = count_pages_num(records_list)
    current_page = get_current_page(params, pages_num)
    paged = get_page_from_table(records_list, current_page)
    render conn, "index.html", records: paged, last: last, pages_num: pages_num, current_page: current_page
  end


  @doc """
  Returns current_page param or 1 if current_page param is not found / bad
  """
  defp get_current_page(params, pages_num) do
    case params["current_page"] do
      nil -> 1
      _ -> case Integer.parse(params["current_page"]) do
        {c, _} when c <= pages_num and c > 0 -> c
        _ -> 1
      end
    end
  end

  @doc """
  Counts total number of pages in records_list
  """
  defp count_pages_num(records_list) do
    Enum.count(records_list) / @per_page |> Float.ceil |> trunc
  end

  @doc """
  Gets current page from paginated table
  """
  defp get_page_from_table(records_list, current_page) do
    records_list
    |> Enum.reverse
    |> BatlethServer.Pagination.get_paginated_list(current_page-1, @per_page)
  end

end
