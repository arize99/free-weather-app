import SearchBar from './SearchBar';
import Units from './Units';

export default function Header() {
    return (
        <div className='weather__header'>
            <SearchBar />
            <Units />
        </div>
    );
}
