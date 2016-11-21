import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from './Button.jsx';
import Table from './Table.jsx';

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

    render() {
        var data = this.getRowsData();
        return (
            <div className='container'>
                <header>
                    <h1>CompareApp Draft</h1>
                </header>
                <br />

                {/* Display the menu options - this will get better */}
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-8'>
                    <div className='btn-group btn-group-sm' role='group'>
                        <Button type='add' level='row' name='Row' tooltip='Add a row' params={data}/>
                        <Button type='add' level='col' name='Col' tooltip='Add a column' callback={this.addColumn} params={data}/>
                        <br/>
                        <Button type='del' level='row' name='Row' tooltip='Delete a row' callback={this.deleteRow} />
                        <Button type='del' level='col' name='Col' tooltip='Delete a column' callback={this.deleteColumn} />
                    </div>
                </div>

                <div className='react-bs-container-body'>
                    <Table data={data}/>
                </div>
            </div>
        );
    }
}

