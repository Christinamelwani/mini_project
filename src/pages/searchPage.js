import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Event from '../components/event';
import SearchBar from '../components/searchBar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SearchPage = () => {
    const events = useSelector((state) => state.event.events);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredEvents = events?.filter(event => event.eventName.toLowerCase().includes(searchTerm));
    const { search } = useLocation();
    
    useEffect(() => {
        const params = new URLSearchParams(search);
        const query = params.get('query');
        if (query) {
            setSearchTerm(query.toLowerCase());
        }
    }, [search]);
    
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