export default function SearchBar() {
    return (
        <form className='weather__search'>
            <input
                type='text'
                placeholder='Search for a city...'
                className='weather__searchform'
            />
            <i className='fa-solid fa-magnifying-glass'></i>
        </form>
    );
}
