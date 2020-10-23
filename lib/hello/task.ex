defmodule Hello.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task" do
    field :completed, :boolean, default: false
    field :task, :string
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:task, :completed, :user_id])
    |> validate_required([:task, :completed, :user_id])
  end
end
