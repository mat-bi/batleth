defmodule Database do
	use GenServer
	@supervision_name :sql
	@table_name "batleth_records"

	def start_link(_,_) do
		{:ok, db} = Sqlitex.open('batleth.sqlite')
		GenServer.start(__MODULE__, db, [name: @supervision_name])
	end

	def getLastTimestamp() do
		GenServer.call(@supervision_name, {:get, :last_timestamp})
	end

	def handle_call({:get, :last_timestamp}, _, db) do
		case Sqlitex.query(db, "SELECT timestamp FROM #{@table_name} ORDER BY timestamp DESC LIMIT 1") do
			[[timestamp: r]] -> r = r
			[] -> r = nil
		end
		{:reply, r, db}
	end

	def getLast() do
		GenServer.call(@supervision_name, {:get, :last} )
	end

	def handle_call({:get, :last}, _, db) do
		{:reply, Sqlitex.query(db, "SELECT * FROM #{@table_name} ORDER BY timestamp DESC LIMIT 1", into: %{}), db}
	end

	def add(status, percentage) do
		GenServer.cast(@supervision_name, {:add, parse_record(status, percentage)})
	end
	
	def add(nil) do
		GenServer.cast(@supervision_name, {:add, parse_record(nil, nil)})
	end

	def parse_record(status, percentage) do
		i = 0
		if status == nil or percentage == nil do
			i = 1	
		end	
		if status == nil do
			status = -1
		end
		if percentage == nil do
			percentage = -1
		end
		tmp = Time.timestamp
		case Database.getLast() do
			[] -> last_st_change = tmp 
			[%{status: l_status, timestamp: _, percentage: _, last_st_change: last_change}] -> 
				if l_status != status do
					last_st_change = tmp
				else 
					last_st_change = last_change
				end
		end
		%{status: status, percentage: percentage, timestamp: tmp-i, last_st_change: last_st_change}
	end

	def handle_cast({:add, %{status: status, percentage: pr, timestamp: tmp, last_st_change: last_st_change}}, db) when is_integer(status) and is_integer(pr) and is_integer(last_st_change) and is_integer(tmp) do
		IO.inspect Sqlitex.query(db,"INSERT INTO batleth_records VALUES (#{tmp}, #{status}, #{pr}, #{last_st_change})")
		{:noreply, db}
	end
	

	
end
		

		
