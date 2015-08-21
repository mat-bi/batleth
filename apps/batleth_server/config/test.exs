use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :batleth_server, BatlethServer.Endpoint,
  http: [port: 4001],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :batleth_server, BatlethServer.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "batleth_server_test",
  pool: Ecto.Adapters.SQL.Sandbox
