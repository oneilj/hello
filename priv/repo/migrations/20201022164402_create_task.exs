defmodule Hello.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:task) do
      add :task, :string
      add :completed, :boolean, default: false, null: false
      add :user_id, :integer

      timestamps()
    end

  end
end
