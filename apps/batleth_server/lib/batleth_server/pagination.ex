defmodule BatlethServer.Pagination do
  def get_paginated_list(list, page_num, page_size) do
    list |> Enum.chunk(page_size, page_size, []) |>  Enum.at(page_num)
  end
end
