import MinMax from './MinMax';

export default function Body() {
    return (
        <div className='weather__body'>
            <h1 className='weather__city'></h1>
            <div className='weather__datetime'></div>
            <div className='weather__forecast'></div>
            <div className='weather__icon'></div>
            <p className='weather__temperature'></p>
            <MinMax />
        </div>
    );
}
