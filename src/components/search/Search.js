import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, url } from "../../api";
// import { response } from "express";

const Search = ({ onSearchChange }) => {

    const [search,  setSearch] = useState(null);

    const loadingOptions = async (inputValue) => {
        try {
            const response = await fetch(`${url}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
            const response_1 = await response.json();
            return {
                options: response_1.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    };
                }),
            };
        } catch (err) {
            console.log(err);
            return { options: [] };
        }
      };
      
    

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search For City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadingOptions}
        />
    )
}

export default Search;