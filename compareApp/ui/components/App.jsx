import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Button from './Button.jsx';

// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cellData: []
        };
    }

    componentDidMount() {
    }

    getRowsData() {
        return([
            {name: '',o_c1:'Criterion 1', o_c2:'Criterion 2'},
            {name: 'Option 1',o_c1:'Opt1 / Crit1', o_c2:'Opt1 / Crit2'},
            {name: 'Option 2',o_c1:'Opt2 / Crit1', o_c2:'Opt2 / Crit2'},
            {name: 'Option 3',o_c1:'Opt3 / Crit1', o_c2:'Opt3 / Crit2'}
        ]);
    }

    renderCells() {
        return this.getRowsData(quantity).map((task) => (
            <Task key={task.id} task={task} />
        ));
    }

    addColumn(cols) {
        console.log('add col');
        console.log(cols);
    }

    addRow(row) {
        console.log('add row');
        console.log(row);
    }

    deleteColumn() {
        console.log('delete col');
    }

    deleteRow() {
        console.log('delete row');
    }

    render() {
        var data = this.getRowsData();
        return (
            <div className='container'>
                <header>
                    <h1>CompareApp Draft</h1>
                </header>
                <br />

                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-8'>
                    <div className='btn-group btn-group-sm' role='group'>
                        <Button type='add' name='Row' tooltip='Add a row' callback={this.addRow} params={data}/>
                        <Button type='add' name='Col' tooltip='Add a column' callback={this.addColumn} params={data}/>
                        <br/>
                        <Button type='del' name='Row' tooltip='Delete a row' callback={this.deleteRow} />
                        <Button type='del' name='Col' tooltip='Delete a column' callback={this.deleteColumn} />
                    </div>
                </div>

                <div className='react-bs-container-body'>
                    <table className='table table-bordered'>
                        {/*this.displayHead()
                        <Row type="thead" data={data[0]}/>*/}
                        <thead>
                            <tr>
                                <th>blob</th>
                                <th>blob</th>
                                <th>blob</th>
                            </tr>
                        </thead>
                        {/*this.displayData()
                        <Row type="tbody" data={data.slice(1)}/>*/}
                        <tbody>
                            <tr>
                                <td>blob</td>
                                <td>blob</td>
                                <td>blob</td>
                            </tr></tbody>
                    </table>
                </div>
                {
                // <BootstrapTable data={this.state.cellData}>
                //     <TableHeaderColumn width='150px' dataField='name' isKey={true}>{/* Blank column for options */}</TableHeaderColumn>
                //     <TableHeaderColumn width='150px' dataField='o_c1'>Product Name</TableHeaderColumn>
                //     <TableHeaderColumn width='150px' dataField='o_c2'>Product Price</TableHeaderColumn>
                // </BootstrapTable>
                }
            </div>
        );
    }
}

