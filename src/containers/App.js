import React from 'react';

import CartList from '../components/cartList.component';
import SearchBox from '../components/searchBox.component';
import { apiCall } from '../api/api';
import './App.css';
//import Scroll from '../components/scroll.component';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorBoundry from '../components/errorBoundry.component';
class App extends React.Component {
  constructor(props){
    super();

    this.state = {
      characters: [],
      searchField: '',
      page: 1,
      loaded: false,
      hasMore: true
    }
    
  }

  componentDidMount(){
    this.getCharacters();
    
  }

  
  getCharacters = () => {

    let { page } = this.state;
    apiCall(`https://api.disneyapi.dev/characters?page=${page}`)
    .then(data => {
      //console.log(data.data)
      const filterData = data.data.filter( item => item.imageUrl !== undefined)
      this.setState({characters: filterData});
      this.setState({loaded: true});
      if( data.nextPage){
        page ++
        this.setState({page: page});
        this.setState({hasMore: true});
      }else{
        this.setState({hasMore: false})
      }

      //console.log( this.state)
    })
    
  }

  onSearchChange = (event) => {
    //console.log(event.target.value);
    this.setState({searchField: event.target.value})
  }

  render(){
    const { characters, searchField} = this.state;

    const filterCharacters = characters.filter( character => { 
      return  character.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return !characters.length ?
      <h1>Loading</h1>
      :
      (
        <div className='tc'>
          <h1 className="f2">Disney Characters</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <InfiniteScroll
            dataLength={filterCharacters}
            next={() => this.getCharacters()}
            hasMore={this.state.hasMore}
            loader={
              <img
                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                alt="loading"
              />
            }>
            {this.state.loaded ?
              <ErrorBoundry>
                <CartList characters= {filterCharacters}/>
              </ErrorBoundry>
              :
              ''
            }
            
          </InfiniteScroll>
        </div>          
      )     
  } //render
}

export default App;
