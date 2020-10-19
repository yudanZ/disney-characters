import React, { useState, useEffect } from 'react';

import CartList from '../components/cartList.component';
import SearchBox from '../components/searchBox.component';
import {apiCall} from '../api/api';

import './App.css';

import ErrorBoundry from '../components/errorBoundry.component';

function App () {

  const [characters, setCharacters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState( true);
  
  
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    setLoadMore(false);
    getCharacters();
    
  }, [loadMore]);

  const handleScroll = () => {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight){
      setLoadMore(true);
    }
  }

  const getCharacters = () => {
    if(hasMore){
      apiCall(`https://api.disneyapi.dev/characters?page=${page}`)
      .then(data => {
        //console.log(data)
        const filterData = data.data.filter( item => item.imageUrl !== undefined)
        setCharacters(filterData);
        if( data.nextPage){
          
          setPage(page + 1);
          setHasMore(true);
        }else{
          setHasMore(false);
         
        }
        
        //console.log( this.state)
      }) 
      setLoadMore(false);
    }
    
  }

  const onSearchChange = (event) => {
    //console.log(event.target.value);
    //this.setState({searchField: event.target.value})
    setSearchField(event.target.value);
  }

  const filterCharacters = (characters, searchField) => {
    const filterCharacters = characters.filter( character => { 
      return  character.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return filterCharacters;
  }
  
  
    return !characters.length ?
      <h1>Loading</h1>
      :
      (
        <div className='tc'>
          <h1 className="f2">Disney Characters</h1>
          
          <SearchBox searchChange={onSearchChange}/>
          
            {hasMore ?
              <ErrorBoundry>
                <CartList characters= {filterCharacters(characters, searchField)}/>
              </ErrorBoundry>
              :
              <div><img
              src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
              alt="loading"
            /></div>
            }
            
        </div>          
      )     
  //render
}
export default App