defmodule Batleth.Supervisor do
	use Supervisor

	@Batleth_Clock Clock
	@Batleth_Batteryreader BatteryReader
	@Batleth_Databaseaccess DatabaseAccess
#
	def init(:ok) do
		children = [
			worker(Clock, [[name: @Batleth_Clock]]),
			worker(BatteryReader, [[name: @Batleth_Batteryreader]])
			worker(DatabaseAccess, [[name: @Batleth_Databaseaccess]])]
	end

	supervise(children, strategy: :one_for_one)
	{:ok, pid} = Supervisor.start_link(children, strategy: :one_for_one)
end
