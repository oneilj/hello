import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';

class Test extends React.Component {

	constructor() {
		super();
		this.state = { 
			user_id: "",
			tasks: [],
			newTask: "",
			taskUpdates: {}
		};
  }

  handleNewTask(event) {
    this.setState({ newTask: event.target.value });
  }

  handleUpateTask(event){
  	this.state.taskUpdates[event.target.id] = event.target.value;
  }

  taskRequest (event, request) {
  	event.preventDefault();
  	axios(request)
    .then(response => {
				this.getTasks();
				this.state.newTask = "";
			  })
		  .catch(error => {
				console.log(error);
		  });
  }

  completeTask (event) {
    var request = {
      method: 'put',
      headers: {"Content-Type": "application/json"},
      url: `http://localhost:4000/api/task/${event.currentTarget.id}`,
      data: {
      	task: {
      		completed: true
      	}
      }
    }
    this.taskRequest(event, request)
  }

  deleteTask (event) {
  	var request = {
      method: 'delete',
      url: `http://localhost:4000/api/task/${event.currentTarget.id}`
    }
    this.taskRequest(event, request)
  }

  updateTask (event, data) {
  	var request = {
      method: 'put',
      headers: {"Content-Type": "application/json"},
      url: `http://localhost:4000/api/task/${event.currentTarget.id}`,
      data: {
      	task: {
      		task: this.state.taskUpdates[event.currentTarget.id]
      	}
      }
    }
		this.taskRequest(event, request)
  }

	handleSubmit (event) {
    var request = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: 'http://localhost:4000/api/task',
      data: {
      	task: this.state.newTask,
      	user_id: this.state.user_id
      }
    }
		this.taskRequest(event, request)
  }

  getTasks() {
  	axios.get(`http://localhost:4000/api/user/${this.props.match.params.user_id}/tasks`)
		  .then(response => {
				console.log(response)
				this.setState({ tasks: response.data.tasks });
			  })
		  .catch(error => {
				console.log(error);
		  });
  }

  componentWillMount() {
  	this.setState({user_id: this.props.match.params.user_id})
  	this.getTasks()
  }

	render() {
		var completeStyle = {marginLeft: 30};
		return (
			<div> Welcome {this.props.match.params.user}
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">New Task</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.newTask}
              onChange = {this.handleNewTask.bind(this)}
            />
          </div>
        </div>

        <button type="submit" value="Submit" className="button is-primary">
        	Add Task
        </button>

      </form>
			  {this.state.tasks.map((task, index) => (
          <div key={index}>
          	<form id = {task.id} onSubmit={this.updateTask.bind(this)}>
          	  <div className="control">
		            <input disabled={task.completed} className="input" type="text" defaultValue={task.task} id={task.id} onChange={this.handleUpateTask.bind(this)}
		            />
	          	</div>
			        <button type="submit" value={task.id} className="button is-primary">
	       				Save Task
	        		</button>

          	</form>
          	<div>
          		<button id={task.id} onClick={this.deleteTask.bind(this)} type="delete" value="Delete" className="button is-primary">Delete</button>
          		<button style={completeStyle} disabled={task.completed} id={task.id} onClick={this.completeTask.bind(this)} type="complete" value="Complete" className="button is-primary">Complete</button>
          	</div>
          </div>
        ))}
			</div>

		)
	}
}
export default Test