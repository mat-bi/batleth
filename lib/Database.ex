require Amnesia
use Amnesia

defdatabase Database do
    deftable Wpis, [ :timestamp, :status, :pr, ], type: :ordered_set do
        @type t :: %Wpis{timestamp: non_neg_integer, status: non_neg_integer, pr: non_neg_integer}
        
        @doc """
            Returns a list of records from timestamp to timestamp.
            """
        def get(tmp2, tmp3) do
            Amnesia.transaction do
               r = where timestamp > tmp2 and timestamp < tmp3
               Amnesia.Selection.values(r)
            end
        end
   
        @doc """
             Returns the timestamp of the last record from the database
             """

        def getLast() do
            Amnesia.transaction do
                Wpis.last!(true)
            end
        end


      
        @doc """
            Adds and saves a Wpis in the database
            """
        def add(self) do
            :not_implemented
        end
    end
end
