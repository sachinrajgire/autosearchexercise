/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios'

class Menu extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:3035/getData').then((result) => {
            // console.log(result.data.body)
            this.state.data = result.data.body
            this.setState({
                data: result.data.body
            })
        }).catch((err) => {
            throw err;
        });
    }

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            data: [],
            searchResult: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        console.log(e.target.value)
        // Start Here
        // ...
        if(e.target.value.length>=3){
            console.log(this.state.data)
            var Obj = []
            this.state.data.forEach(element => {
                if(element.name.toLowerCase().includes(e.target.value.toLowerCase())){
                    console.log(element.name)
                    Obj.push(element)
                    this.setState({
                        searchResult: Obj
                    })
                }
            });
        }

    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onKeyUp={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                <div>
                    {  this.state.searchResult.length >0 ?  
                         this.state.searchResult.map(i=>{
                            return  <div style={{border:"2px solid black", display:"flex"}}>
                                <img src={`../..${i.picture}`} style={{width:"100px", height: "100px"}} />
                                <div>
                                <strong>{i.name}</strong>
                                <p>{i.about}</p>
                                </div>
                            </div> 
                            
                             
                            // console.log(`<img src={require(".${i.picture}")} style={{width:"20px", height: "20px"}} />`) 
                            
                        }) : ""
                    }
                </div>
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;