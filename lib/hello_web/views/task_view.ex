
defmodule HelloWeb.TaskView do
  use HelloWeb, :view

  #show multiple tasks
  def render("index.json", %{tasks: tasks}) do
    %{
      tasks: Enum.map(tasks, &task_json/1)
    }
  end

  # show single task
  def render("show.json", %{task: task}) do
    %{
      task: task_json(task)
    }
  end

  def task_json(task) do
    %{
      id: task.id,
      task: task.task,
      completed: task.completed,
      user_id: task.user_id
    }
  end

end