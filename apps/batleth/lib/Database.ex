require Amnesia
use Amnesia

defdatabase Database do

	@moduledoc """
		Represents the database of the app.
	"""
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

	@doc """
		Gets the record before last.
		Example:
		iex> Database.Wpis.previous
		%Database.Wpis{pr: 46, status: 0, timestamp: 1439553748}

	"""
        def previous() do
            Amnesia.transaction do
                getLast |> prev |> get
            end
        end
	@doc ~S"""
		Gets and returns a list of records [Wpis] with the same status as the previous record's status, that have been saved in the last (at most) 30 minutes, but newer than last change 			of the battery status.
		
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
		r = previous
		if r == nil do
                    []
                else
		        Amnesia.transaction do
			    r = where timestamp >= r.timestamp-1800 and timestamp >= LastChange.get.timestamp and status == r.status
			    Amnesia.Selection.values(r)	
		        end
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
                last(true)
            end
        end


        @doc """
             Parses percentage and status to a struct Wpis, adding the current timestamp (in sec) or -1, when the third parameter is not equal to :timestamp (default).
	     
		Example:
			iex> Database.Wpis.parse_wpis(-1,-1,-1)
			%Database.Wpis{pr: -1, status: -1, timestamp: -1}

			iex> iex(6)> Database.Wpis.parse_wpis(-1,-1)   
			%Database.Wpis{pr: -1, status: -1, timestamp: 1439554494}


             """

        def parse_wpis(percentage, st, tmp \\ :timestamp) do
		case tmp do
			:timestamp -> tms = Time.timestamp
			_ -> tms = -1
		end

		%Wpis{timestamp: tms, status: st, pr: percentage}
        end

	@doc """
		Gets the last n records from the database as a list.

		Examples:
			iex> Database.Wpis.last(0, [])
			[]

			iex> Database.Wpis.last(9,[])
			[%Database.Wpis{pr: 36, status: 0, timestamp: 1439553028},
			 %Database.Wpis{pr: 38, status: 0, timestamp: 1439553088},
			 %Database.Wpis{pr: 38, status: 0, timestamp: 1439553148},
			 %Database.Wpis{pr: 40, status: 0, timestamp: 1439553208},
			 %Database.Wpis{pr: 40, status: 0, timestamp: 1439553268},
			 %Database.Wpis{pr: 40, status: 0, timestamp: 1439553328},
			 %Database.Wpis{pr: 42, status: 0, timestamp: 1439553388},
			 %Database.Wpis{pr: 42, status: 0, timestamp: 1439553448},
			 %Database.Wpis{pr: 44, status: 0, timestamp: 1439553508}]

			iex> Database.Wpis.last(2,[])
			[%Database.Wpis{pr: 44, status: 0, timestamp: 1439553568},
			 %Database.Wpis{pr: 44, status: 0, timestamp: 1439553628}]

	"""
	def last(0, t) do
		t
	end

	def last(n, []) when is_integer(n) do
		l = Wpis.getLast |> Wpis.get
		last(n-1, [l])
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

	    Example:
		iex> Database.Wpis.add(%Database.Wpis{pr: 0, status: 0, timestamp: 0})
		%Database.Wpis{pr: 0, status: 0, timestamp: 0}

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
			Gets and returns the record with timestamp, used as a parameter. Returns a %Database.Prosta struct or nil, when there is no such a record.

			Examples:
				iex> Database.Prosta.get(0)
				nil

				iex> Database.Prosta.get(1439553628)
				%Database.Prosta{a: 0.013636363636363636, b: -19630231.896969695, timestamp: 1439553628}
		
		"""
		def get(tmp) do
			Amnesia.transaction do
				read(tmp)
			end
		end

		@doc """
            		Gets a list of records from timestamp to timestamp. Returns a list of %Database.Prosta struct.
			
			Examples:
				iex> Database.Prosta.get(0,9999999999999999999)
				[%Database.Prosta{a: -0.0078666673986199, b: 11324478.30751368, timestamp: 1439550437},
				 %Database.Prosta{a: -0.006054798829490573, b: 8716202.584347937, timestamp: 1439551037},
				 %Database.Prosta{a: -0.005397566345225292, b: 7770083.39993865, timestamp: 1439551217},
				 %Database.Prosta{a: 0.013939393939393942, b: -20066460.02666667, timestamp: 1439553028},
				 %Database.Prosta{a: 0.013636363636363636, b: -19630231.896969695, timestamp: 1439553628}]
				
				iex> Database.Prosta.get(99999999999,99999999999999999999999999999)
				[]

            	"""
		def get(tmp2, tmp3) do
            		Amnesia.transaction do
               			r = where timestamp >= tmp2 and timestamp <= tmp3
               			Amnesia.Selection.values(r)
            		end
        	end

		@doc """
			Returns the last record's timestamp.

			Examples:
				iex> Database.Prosta.getLast
				1439553628

				iex> Database.Prosta.getLast
				nil
			
		"""
		def getLast() do
			Amnesia.transaction do
				Prosta.last(true)
			end
		end

		@doc """
			Gets one argument as a map that consists of a,b. Returns %Database.Prosta struct with the current timestamp

			## Example:
				iex> Database.Prosta.parse_prosta(%{a: 43, b: 15})
				%Database.Prosta{a: 43, b: 15, timestamp: 1439553380} 
		"""

		def parse_prosta(%{a: a, b: b}) do
		    %Prosta{timestamp: Time.timestamp, a: a, b: b}
                end


		@doc """
            		Adds and saves a record [%Database.Prosta struct] in the database.

			Example:
				iex> Database.Prosta.add(%Database.Prosta{a: 0, b: 0, timestamp: 0})
				%Database.Prosta{a: 0, b: 0, timestamp: 0}

            	"""
		def add(self) do
           		Amnesia.transaction do
                		write(self)
           		end
        	end

	end
end
