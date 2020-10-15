import React, {useMemo, useState, useEffect, Component} from "react";
import axios from "axios";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import ReactDOM, {render} from "react-dom";
import Tabulator from "tabulator-tables"; //import Tabulator library
import { CSVReader } from 'react-papaparse'

import "./App.css";

//only one class? you mad man
class Home extends Component {
    //these arent pretty refs for react
    el = React.createRef();
    tabulator = null; //variable to hold my table
    buttonRef = React.createRef();

    constructor(props) {
        super(props);
        // this.tableRef = React.createRef(); //create reference object
        this.state = {
            data: [],
            appError: "",
            tabulatorLength: 0
        };
        this.onAddRow= this.onAddRow.bind(this);
    }

    onAddRow(){
        let values = {
            id: this.state.data.length + 1,
            title: document.getElementById("title").value,
            release_year:document.getElementById("release_year").value,
            origin:document.getElementById("origin").value,
            director:document.getElementById("director").value,
            film_cast:document.getElementById("film_cast").value,
            genre:document.getElementById("genre").value,
            wiki:document.getElementById("wiki").value,
            plot:document.getElementById("plot").value,
            delete: false
        };
        //put should be in a function, duplicated code
        axios.put("http://localhost:4433/add", values)
            .then(response => {
                this.tabulator.addRow(values, true);
                this.state.tabulatorLength++;
                console.log(response);
            }).catch(error => {
            console.log(error);
        });
    }

    //praise papa
    handleOpenDialog = (e) => {
        if (this.buttonRef.current) {
            this.buttonRef.current.open(e);
        }
    }

    //praise papa
    handleOnFileLoad = (data) => {
        console.log(data);
        for(let i=0;i<data.length;i++){
            //put should be in a function, duplicated code
            axios.put("http://localhost:4433/add", data[i].data)
            .then(response => {
                this.state.tabulatorLength++;
                data[i].data.id = this.state.tabulatorLength;
                data[i].data.delete = false;
                this.tabulator.addRow(data[i].data, true);
                console.log(response);
            }).catch(error => {
            console.log(error);
        });
        }
    }

    //praise papa
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    //praise papa
    handleOnRemoveFile = (data) => {
        console.log(data);
    }

    //praise papa
    handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (this.buttonRef.current) {
            this.buttonRef.current.removeFile(e);
        }
    }

    componentDidMount() {
        //get list as soon as I can
        axios.get("http://localhost:4433/list").then(response => {
            this.setState({ data: response.data });
            this.setState({ tabulatorLength: response.data.length });
            //instantiate tabulator manually. Not the 'true' react way...
            this.tabulator = new Tabulator(this.el, {
                data: response.data, //link data to table
                height: window.innerHeight,
                paginationSize:50,
                layout: "fitColumns", //fit columns to width of table
                addRowPos: "top",
                pagination: "local",
                paginationSizeSelector: [50, 100, 200, 500, 1000, 5000, response.data.length],
                movableColumns: false,
                resizableRows: false,
                cellEdited:function(cell){
                    let field = cell.getColumn().getDefinition().field;
                    if(field !== "delete"){//this shouldnt be possible anyway, it has no editor
                        let value = cell.getValue();
                        let id = cell.getRow().getData().id;
                        //wild wild west update
                        axios.put("http://localhost:4433/update", {
                            column: field,
                            value: value,
                            id: id
                        }).then(response => {
                            console.log(response);
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                },
                columns: [
                    {
                        title: "ID",
                        field: "id",
                        visible: false,
                    },
                    {
                        title: "Title",
                        field: "title",
                        hozAlign: "left",
                        headerFilter: "input",
                        width: 275,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Year",
                        field: "release_year",
                        hozAlign: "left",
                        headerFilter: "number",
                        width: 100,
                        formatter: "number",
                        editor: "number",
                        editorParams:{
                            min:1850,
                            max:2020,
                            step:10,
                            elementAttributes:{
                                maxlength:"4",
                                minlength:"4"
                            }
                        }
                    },
                    {
                        title: "Ethnic Origin",
                        field: "origin",
                        hozAlign: "left",
                        headerFilter: "input",
                        width: 150,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Director",
                        field: "director",
                        hozAlign: "left",
                        headerFilter: "input",
                        width: 150,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Cast",
                        field: "film_cast",
                        hozAlign: "left",
                        headerFilter: "input",
                        width: 150,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Genre",
                        field: "genre",
                        hozAlign: "left",
                        headerFilter: "input",
                        width: 150,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Wiki Page",
                        field: "wiki",
                        hozAlign: "left",
                        width: 150,
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                    },
                    {
                        title: "Plot",
                        field: "plot",
                        hozAlign: "left",
                        editor: "input",
                        editorParams: {
                            elementAttributes:{
                                minlength:"1",
                            }}
                        //no width just fill the rest of screen space
                    },
                    {
                        //not the prettiest delete method ive ever made with tabulator, but time = potential money
                        title:"Delete",
                        field:"delete",
                        hozAlign:"center",
                        formatter: "tickCross",
                        width: 85,
                        cellClick: function(e, cell){
                            if(window.confirm(`Are you sure you want to delete '${cell.getRow().getData().title}'?`)){
                                axios.delete(`http://localhost:4433/delete/${cell.getRow().getData().id}`)
                                    .then(response => {
                                        console.log(response);
                                        cell.getRow().delete();
                                    }).catch(error => {
                                    console.log(error);
                                });

                            }
                        }
                    }
                ]
            });
        }).catch(error => {
            this.setState({
                appError: `Error getting movie data: ${error}`
            });
        });
    }

    render(){
        //dirty html + pretty csv + attach tabulator
        return (
            <div>
                <div className="form-inline" style={{margin:'0 auto', padding: 0, width: '1920'}}>
                    <input type="text" id={"title"} style={{display:'inline'}} name="title" placeholder="Title" className="form-control"/>
                    <input type="number" id={"release_year"} style={{display:'inline'}} name="release_year" placeholder="Year" min="1850" max="2022" className="form-control"/>
                    <input type="text" id={"origin"} style={{display:'inline'}} name="origin" placeholder="Origin" className="form-control"/>
                    <input type="text" id={"director"} style={{display:'inline'}} name="director" placeholder="Director" className="form-control"/>
                    <input type="text" id={"film_cast"} style={{display:'inline'}} name="film_cast" placeholder="Film Cast" className="form-control"/>
                    <input type="text" id={"genre"} style={{display:'inline'}} name="genre" placeholder="Genre" className="form-control"/>
                    <input type="text" id={"wiki"} style={{display:'inline'}} name="wiki" placeholder="Wiki" className="form-control"/>
                    <input type="text" id={"plot"} style={{display:'inline'}} name="plot" placeholder="Plot" className="form-control"/>
                    <button type="submit" id="add-row" onClick={this.onAddRow}>Add Row</button>
                </div>
                <CSVReader ref={this.buttonRef} onFileLoad={this.handleOnFileLoad} onError={this.handleOnError} noClick noDrag onRemoveFile={this.handleOnRemoveFile} config={{header: true}}>
                    {({ file }) => (
                        <aside style={{display: 'flex',flexDirection: 'row',marginBottom: 10}}>
                            <button type='button' onClick={this.handleOpenDialog} style={{borderRadius: 0,marginLeft: 0,marginRight: 0,marginTop: 11,paddingLeft: 0,paddingRight: 0,height: 45,width: 75}}>Add CSV File</button>
                            <div style={{borderWidth: 1,borderStyle: 'solid',borderColor: '#ccc',height: 45,lineHeight: 2.5,marginTop: 10,marginBottom: 10,paddingLeft: 13,paddingTop: 0,paddingBottom: 0,width: '64.33%'}}>{file && file.name}</div>
                            <button style={{borderRadius: 0,marginLeft: 0,marginRight: 0,marginTop: 11,paddingLeft: 0,paddingRight: 0,height: 45,width: 75}} onClick={this.handleRemoveFile}>Remove</button>
                        </aside>
                    )}
                </CSVReader>
                <div ref={el => (this.el = el)} />
            </div>
        );
    }
}

//force render tabulator
const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);

export default Home;