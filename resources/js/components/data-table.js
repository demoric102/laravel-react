import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.author}
                </td>
                <td>
                    {this.props.obj.price}
                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.blurp}
                </td>
                <td>
                    <button onClick={() => this.props.onUpdate(this.props.obj.id)} type="button" className="btn btn-outline-info">View</button>
                </td>
                <td>
                    <button onClick={() => this.props.onDelete(this.props.obj.id)} type="button" className="btn btn-outline-danger">Remove</button>
                </td>
            </tr>
        );
    }
}

export default DataTable;