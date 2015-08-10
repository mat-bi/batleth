require Amnesia
use Amnesia

defdatabase Database do
    deftable Wpis, [ :timestamp, :status, :pr ], type: :ordered_set do
        @type t :: %Wpis{timestamp: non_neg_integer, status: non_neg_integer, pr: non_neg_integer}
        
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
		case tmp do
			:timestamp -> tms = Time.timestamp
			_ -> tms = -1
		end

		#last = Wpis.get(Wpis.getLast)
		#if percentage == nil and st == nil do
		#	tms = tms-3
		#end

            %Wpis{ timestamp: tms, status: st, pr: percentage}
        end

	def isWpis(zmienna) do
		is_map(zmienna) and zmienna.__struct__ == Wpis
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

	deftable Prosta, [ :timestamp, :a, :b ], type: :ordered_set do
		@type t :: %Prosta{timestamp: non_neg_integer, a: Float , b: Float}
	

		@doc """
			Gets and returns the record with timestamp, used as a parameter. Returns a %Database.Prosta struct.
		"""
		def prosta_get(tmp) do
			Amnesia.transaction do
				read(tmp)
			end
		end

		@doc """
            		Gets a list of records from timestamp to timestamp. Returns a list of %Database.Prosta struct.
            	"""
		def prosta_get(tmp2, tmp3) do
            		Amnesia.transaction do
               			r = where timestamp >= tmp2 and timestamp <= tmp3
               			Amnesia.Selection.values(r)
            		end
        	end

		@doc """
            		Adds and saves a record in the database.
            	"""
		def prosta_add(self) do
           		Amnesia.transaction do
                		write(self)
           		end
        	end

	end
end
