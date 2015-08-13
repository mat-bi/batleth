require Amnesia
use Amnesia

defdatabase Database do
    deftable Wpis, [ :timestamp, :status, :pr ], type: :ordered_set do
        @type t :: %Wpis{timestamp: non_neg_integer, status: non_neg_integer, pr: non_neg_integer}
        
        @doc ~S"""
            Gets a list of records from timestamp to timestamp. Returns a list of %Database.Wpis struct.

		## Examples

		iex> Wpis.get(1439383684, 1439389895)
		[%Database.Wpis{pr: 40, status: 0, timestamp: 1439383684},
 		 %Database.Wpis{pr: 40, status: 0, timestamp: 1439383744},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439389660},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439389739},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439389799},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439389859}]

		iex> Wpis.get(1439365465, 1439366465) 
		[]

            """
        def get(tmp2, tmp3) do
            Amnesia.transaction do
               r = where timestamp >= tmp2 and timestamp <= tmp3
               Amnesia.Selection.values(r)
            end
        end

	@doc ~S"""
		Gets and returns the record with timestamp, used as a parameter. Returns a %Database.Wpis struct.

		## Examples
		
		iex> Wpis.get(1439383744)
		%Database.Wpis{pr: 40, status: 0, timestamp: 1439383744}

		iex> Wpis.get(1439390781)
		%Database.Wpis{pr: 0, status: 4, timestamp: 1439390781}
	"""
	def get(tmp) do
		Amnesia.transaction do
			read(tmp)
		end
	end

	@doc ~S"""
		Gets and returns a list of records [Wpis] with the same status as the current, that have been saved in the last (at most) 30 minutes, but newer than last change 			of the battery status.
		
		## Examples
		
		iex> Wpis.lastWpises
		[%Database.Wpis{pr: 0, status: 4, timestamp: 1439390541},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390601},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390661},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390721},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390781},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390841},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390901},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439390961},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439391021},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439391081},
 		 %Database.Wpis{pr: 0, status: 4, timestamp: 1439391141}]

	"""
	def lastWpises() do
		IO.inspect r = get(getLast)
		
		Amnesia.transaction do
			r = where timestamp >= r.timestamp-1800 and timestamp >= LastChange.get.timestamp and status == r.status
			Amnesia.Selection.values(r)	
		end
	end
   
        @doc ~S"""
             Returns the timestamp of the last record from the database.

	     	## Examples

    		iex> Wpis.add(%Wpis{pr: 54, timestamp: 143, status: 0})
    		%Wpis{pr: 54, timestamp: 143, status: 0}
    		iex> Wpis.getLast
    		143
		
             """
        def getLast() do
            Amnesia.transaction do
                Wpis.last(true)
            end
        end


        @doc """
             Parses percentage and status to a struct Wpis, adding the current timestamp (in sec).
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

	def last(0, t) do
		t
	end

	def last(n, []) when is_integer(n) do
		l = Wpis.get(Wpis.getLast)
		last(n-1, [l])
	end

	def last_st([]) do
		[]
	end

	def last_st(l) do
		s = List.last(l).status
		if List.first(l).status == s do
			[head|tail] = l
			last_st(tail)
		end
                
	end
 	
	def last(n, t) when is_integer(n) do		
		Amnesia.transaction do
			[head|tail] = t
			w = Wpis.get(Wpis.prev(head.timestamp))
			if w != nil do
				t = [w|t]
				last(n-1, t)
			else
				t
			end

		end
	end
		

    
	            
        @doc """
            Adds and saves a Wpis in the database.
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
		def get(tmp) do
			Amnesia.transaction do
				read(tmp)
			end
		end

		@doc """
            		Gets a list of records from timestamp to timestamp. Returns a list of %Database.Prosta struct.
            	"""
		def get(tmp2, tmp3) do
            		Amnesia.transaction do
               			r = where timestamp >= tmp2 and timestamp <= tmp3
               			Amnesia.Selection.values(r)
            		end
        	end

		def getLast() do
			Amnesia.transaction do
				Prosta.last(true)
			end
		end


				


		@doc """
            		Adds and saves a record [%Database.Prosta struct] in the database.
            	"""
		def add(self) do
           		Amnesia.transaction do
                		write(self)
           		end
        	end

	end
end
