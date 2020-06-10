import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SingleRecord = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>
        <td>
            <Link to={"/edit/"+props.todo._id}><button type="button" class="btn btn-warning">Edit</button></Link>
        </td>
    </tr>
)

export default class RecordList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <SingleRecord todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>All Database Records</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Item description</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}