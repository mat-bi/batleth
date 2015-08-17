defmodule Batleth.Supervisor do
        use Supervisor
        def start(_,_) do
                Amnesia.start
                Database.wait
                Supervisor.start_link(__MODULE__, [])
        end

        def init([]) do
        children = [
			(worker(Logging, [[], [name: :logger]])),
			(worker(DatabaseAccess, [[], [name: :base]])),
			(worker(BatteryReader, [[], [name: :battery]])),
			(worker(Clock, [[], [name: :clock]])),
			(worker(Stat, [[], []])),
			(worker(LastChange, [[],[]])),
			(worker(DatabaseAccess.Prosta, [[],[]])),
			(worker(Batleth, [[],[]]))
			]
        supervise(children, strategy: :one_for_one)
        end
end
