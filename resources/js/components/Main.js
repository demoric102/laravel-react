import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import DataTable from './data-table'
  
class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
        booksCollection: [],
        author: '',
        price: '',
        title: '',
        blurp: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
  }
   
    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
  
    onSubmitButton(e) {
        e.preventDefault();
   
        axios.post('/api/books', {
            author: this.state.author,
            price: this.state.price,
            title: this.state.title,
            blurp: this.state.blurp
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        this.setState({
            author: '',
            price: '',
            title: '',
            blurp: ''
        })
    }

    handleDelete(id) {
        axios.delete('/api/books/'+id)
            .then(res => {
                const booksCollection = this.state.booksCollection.filter(item => item.id !== id);
                this.setState({booksCollection})
            })
            .catch(function (error){
                console.error(error);
            })
    }

    handleUpdate(id) {
        const book = this.state.booksCollection.filter(book => book.id === id);
        this.setState({
            author: book.author,
            price: book.price,
            title: book.title,
            blurp: book.blurp
        })
    }

    dataTable() {
        return this.state.booksCollection.map((data, i) => {
            return <DataTable obj={data} key={i} onDelete={this.handleDelete} onUpdate={this.handleUpdate} />;
        });
    }

    componentDidMount() {
        axios.get('/api/books')
            .then(res => {
                this.setState({ booksCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div className="container">
                <h1>ConnexOne Inventory</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Bookshop Inventory</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmitButton}>
                                    <label>Author:</label>
                                    <input type="text" name="author" className="form-control" value={this.state.author} onChange={this.onChangeValue} />
                                    <label>Price:</label>
                                    <input type="number" step="any" name="price" className="form-control" value={this.state.price} onChange={this.onChangeValue} />
                                    <label>Title:</label>
                                    <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.onChangeValue} />
                                    <label>Blurp:</label>
                                    <input type="text" name="blurp" className="form-control" value={this.state.blurp} onChange={this.onChangeValue} />
                                    <br />
                                    <button className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Author</td>
                                <td>Price</td>
                                <td>Title</td>
                                <td>Blurp</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
