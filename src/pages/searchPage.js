import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Event from '../components/event';
import SearchBar from '../components/searchBar';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';

const SearchPage = () => {
    const events = useSelector((state) => state.event.events);
    const filteredEvents = events?.filter(event => event?.name?.toLowerCase().includes(searchTerm));
    
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query');
        if (query) {
            setSearchTerm(query.toLowerCase());
        }
    }, []);
    
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    return (
        <>
        <Navbar title={"Search"}/>
        <section className="p-4 md:p-20 gap-5">
            <SearchBar onSearch={handleSearch} />
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredEvents.map((event) => (
                    <Event key={event.id} eventData={event} />
                ))}
            </div>
        </section>
        <Footer />
        </>
    );
}

export default SearchPage;