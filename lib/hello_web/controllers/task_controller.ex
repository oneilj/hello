defmodule HelloWeb.TaskController do
  use HelloWeb, :controller
  import Ecto.Query
  import Logger
  alias Hello.{Repo, Task}

  def create(conn, params) do
    changeset = Task.changeset(%Task{}, params)
    case Repo.insert(changeset) do
      {:ok, _task} ->
        tasks = Repo.all(Task)
        render conn, "index.json", tasks: tasks
    end
  end

  def show(conn, %{"id"=> id}) do
    task = Repo.get(Task, id)
    render conn, "show.json", task: task
  end

  def user_tasks(conn, %{"user_id"=> user_id}) do
    tasks = Repo.all(from t in Task, where: t.user_id == ^user_id)
    render conn, "index.json", tasks: tasks
  end

  def delete(conn, %{"id" => id}) do
    task = Repo.get(Task, id)
    Repo.delete(task)
    tasks = Repo.all(Task)
    render conn, "index.json", tasks: tasks
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Repo.get(Task, id)
    changeset = Task.changeset(task, task_params)

    case Repo.update(changeset) do
      {:ok, _blog} ->
        blog = Repo.get(Task, id)
        render conn, "show.json", task: task
    end
  end

end