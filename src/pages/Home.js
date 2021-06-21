import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { SearchInput, RadioInputsWrapper, SearchButtonWrapper } from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {

    const [input, setInput] = useLastQuery('');
    const [results, setResults] = useState(null);
    const [searchOptions, setSearchOptions] = useState('shows');

    const isShowsSearch = searchOptions === 'shows';

    const onInputChange = (ev) => {
        setInput(ev.target.value)
    }

    const onSearch = () => {
        apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
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
            <SearchInput type="text" placeholder="Search for something" onChange={onInputChange} 
                onKeyDown={onKeyDown} value={input} />
            <RadioInputsWrapper>
                <div>
                    <CustomRadio label="Shows" id="show-search" value="shows" checked={isShowsSearch}
                        onChange={onRadioChange} />
                </div>
                <div>
                    <CustomRadio label="Actors/Actresses" id="actor-search" value="people" 
                        checked={!isShowsSearch} onChange={onRadioChange} /> 
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
