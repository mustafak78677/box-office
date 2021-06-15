import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';

const Home = () => {

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOptions, setSearchOptions] = useState('shows');

    const isShowsSearch = searchOptions === 'shows';

    const onInputChange = (ev) => {
        setInput(ev.target.value)
    }

    const onSearch = () => {
        apiGet(`search/${searchOptions}?q=${input}`).then(result => {
            setResults(result);
        })
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13) {
            onSearch();
        }
    }

    const onRadioChange = (ev) => {
        setSearchOptions(ev.target.value)
    }

    // eslint-disable-next-line
    console.log(searchOptions)

    const renderResults = () => {
        if(results && results.length === 0) {
            return <div>No Result</div>
        }

        if(results && results.length > 0) {
            
            return results[0].show ? <ShowGrid data={results} /> : <ActorGrid data={results} />
        }
        return null;
    }

    return (
        <MainPageLayout>
            <input type="text" placeholder="Search for something" onChange={onInputChange} 
                onKeyDown={onKeyDown} value={input} />
            <div>
                <label htmlFor="show-search">
                    Shows
                    <input id="show-search" type="radio" value="shows" checked={isShowsSearch} 
                        onChange={onRadioChange} />
                </label>
                <label htmlFor="actor-search">
                    Actors/Actresses
                    <input id="actor-search" type="radio" value="people" checked={!isShowsSearch} 
                        onChange={onRadioChange} />
                </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
