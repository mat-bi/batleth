defmodule Batleth.Mixfile do
  use Mix.Project

  def project do
    [app: :batleth,
     version: "0.0.1",
     elixir: "~> 1.0",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     escript: [main_module: Batleth.Supervisor],
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [applications: [:logger, :amnesia],
    mod: { Batleth.Supervisor, []}]
	
 end
def escript do
	[main_module: Batleth]
	end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type `mix help deps` for more examples and options
  defp deps do
    [{:amnesia, github: "meh/amnesia", tag: :master},
     {:exrm, "~> 0.19.2"}]
     #{:relx, github: "erlware/relx", tag: :master}]
  end
end
