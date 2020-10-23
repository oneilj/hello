defmodule HelloWeb.HelloController do
  use HelloWeb, :controller
  import Ecto.Query
  alias Hello.{Repo, User}

  def authenticate(conn, %{"username" => username, "password" => password}) do

    user = Repo.one(from u in User, where: u.username == ^username)
    cond do
      password == user.password ->
        render conn, "show.json", user: user
      password != user.password ->
        conn
          |> send_resp(401, "unauthorized")
    end
  end

end