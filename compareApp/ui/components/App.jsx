import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//import Cell from './Cell.jsx';

// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cellData: []
        };
    }

    componentDidMount() {
        this.setState({
            cellData: this.getCells(3)
        });
    }

    getCells(quantity) {
        var items = [];
        const startId = items.length;
        for (let i = 0; i < quantity; i++) {
            const id = startId + i;
            items.push({
                id: id,
                name: 'Item name ' + id,
                price: 2100 + i
            });
        }
        return items;
    }

    // renderCells(quantity) {
    //     return this.getCells(quantity).map((cell) => (
    //         <Cell key={cell._id} cell={cell} />
    //     ));
    // }

    render() {
        return (
            <div className="container">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <header>
                    <h1>CompareApp Draft</h1>
                </header>
                <BootstrapTable data={this.state.cellData}
                    striped={true}
                    insertRow={true}
                    deleteRow={true}
                    selectRow={{ mode: 'checkbox' }}
                    options={{
                        onAddRow: this.props.onAddRow,
                        onDeleteRow: this.props.onDeleteRow
                    }}>
                    {/*this.renderCells()*/}
                    <TableHeaderColumn width='150px' dataField='id' isKey={true}>Product ID</TableHeaderColumn>
                    <TableHeaderColumn width='150px' dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn width='150px' dataField='price'>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

