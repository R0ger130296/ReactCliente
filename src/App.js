import './index.css';
import { Component } from "react";
import axios from "axios";

export class App extends Component {
    state = {
        title: '',
        posts: [],
        id: '',
    };
    handleChange = event => {
        this.setState({ name: event.target.value });
        this.setState({ id: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
    
        axios.delete(`http://localhost:8000/tareas/${this.state.id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    handleSubmit = event => {
        event.preventDefault();

        const tareas = {
            title: this.state.name
        };

        axios.post(`http://localhost:8000/tareas`, { tareas })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    componentDidMount() {
        axios
            .get(`http://localhost:8000/tareas`)
            .then((res) => {
                const posts = res.data.result
                // eslint-disable-next-line array-callback-return
                posts.map((e)=>{
                    console.log(e)
                    if(e.published === true){
                        this.setState({ posts });
                    }
                })
               
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans" >
                    <div className="bg-blue rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                        <div className="mb-4">
                            <h1 className="text-grey-darkest">Todo List</h1>
                            <div className="flex mt-4">
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                                <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-blue hover:bg-teal">Add</button>
                            </div>
                        </div>
                        <div>
                            {this.state.posts.map((tarea) => (
                                <div className="flex mb-4 items-center" key={tarea.id}>
                                    <p className="w-full text-grey-darkest"
                                        name="title"
                                        onChange={this.handleChange}
                                    > {tarea.title}</p>
                                    <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-blue text-green border-green hover:bg-green">Done</button>
                                    <button type="submit" className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-blue hover:bg-red"
                                     name="id" onChange={this.handleChange}
                                    >Remove</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex mb-4 items-center">
                            <p className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-blue text-green border-green hover:bg-green">Activos</p>
                            <p className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-blue hover:bg-red">Realizados</p>
                            <p className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-blue text-green border-green hover:bg-green">Todos</p>
                        </div>
                    </div>
                </div>
            </form>
        );

    }
}


export default App;