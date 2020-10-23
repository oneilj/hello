defmodule Hello.Repo.Migrations.TasksAddUserIdColumn do
  use Ecto.Migration

  def change do
    alter table("task") do
        add :user_id, :integer
    end
  end
end
