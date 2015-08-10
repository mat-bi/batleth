require Amnesia
use Amnesia

defdatabase Database do
    deftable Wpis, [ :timestamp, :status, :pr, :last_st_change ], type: :ordered_set do
        @type t :: %Wpis{timestamp: non_neg_integer, status: non_neg_integer, pr: non_neg_integer, last_st_change: non_neg_integer}
        
        @doc """
            Gets a list of records from timestamp to timestamp. Returns a list of %Database.Wpis struct.
            """
        def get(tmp2, tmp3) do
            Amnesia.transaction do
               r = where timestamp >= tmp2 and timestamp <= tmp3
               Amnesia.Selection.values(r)
            end
        end

	@doc """
		Gets and returns the record with timestamp, used as a parameter. Returns a %Database.Wpis struct
	"""
	def get(tmp) do
		Amnesia.transaction do
			read(tmp)
		end
	end
   
        @doc """
             Returns the timestamp of the last record from the database
             """

        def getLast() do
            Amnesia.transaction do
                Wpis.last(true)
            end
        end


        @doc """
             Parses percentage and status to a struct Wpis, adding the current timestamp (in sec)
             """

        def parse_wpis(percentage, st, tmp \\ :timestamp) do
		tms = Time.timestamp
		last = Wpis.get(Wpis.getLast)
		cond do
			last == nil ->
				st_change = tms
		    	last.status == st ->
				st_change = last.last_st_change
			true ->
				st_change = tms
		end
		if percentage == nil and st == nil do
			tms = tms-3
		end

            %Wpis{ timestamp: tms, status: st, pr: percentage, last_st_change: st_change}
        end
            
        @doc """
            Adds and saves a Wpis in the database
            """
        def add(self) do
            Amnesia.transaction do
                write(self)
            end
        end
    end
end
