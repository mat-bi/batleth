#A mix task for installing the database. Before you run the app for the first time, use mix install in the terminal.

defmodule Mix.Tasks.Install do
  use Mix.Task
  use Database

  def run(_) do

    Amnesia.Schema.create
    Amnesia.start    
    
    Database.create(disk: [node])

     Database.wait
	    
    
    Amnesia.stop
  end
end
