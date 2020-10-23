defmodule HelloWeb.HelloView do
  use HelloWeb, :view

  # show single user
  def render("show.json", %{user: user}) do
    %{
      user: task_json(user)
    }
  end

  def task_json(user) do
    %{
      id: user.id,
      username: user.username
    }
  end

end