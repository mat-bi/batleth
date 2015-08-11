defmodule Stat do
	use GenServer
	use Database

	@supervision_name :stat

	def start_link(_, _) do
		GenServer.start(__MODULE__,  [] , [name: :stat])
	end

	def run(wpis) do #Jakie argumenty będzie przyjmować?
		#Warunki startu - zmiana poziomu naładowania baterii.
		
		GenServer.call(@supervision_name, {:run, wpis})
	end

	#Funkcje statystyczne powinny znaleźć się tutaj.

	def handle_call({:run, wpis}, _, _) do
		#Tak, to jeszcze nie ma sensu.
	end
	
	
	
end
