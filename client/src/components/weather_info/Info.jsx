import WeatherCard from './WeatherCard';

export default function Info() {
    return (
        <div className='weather__info'>
            <WeatherCard
                faIcon={'fa-solid fa-temperature-full'}
                title={'Real Feel'}
                valueClass={'weather__realfeel'}
            >
                18&#176;
            </WeatherCard>

            <WeatherCard
                faIcon={'fa-solid fa-droplet'}
                title={'Humidity'}
                valueClass={'weather__humidity'}
            >
                18&#176;
            </WeatherCard>

            <WeatherCard
                faIcon={'fa-solid fa-wind'}
                title={'Wind'}
                valueClass={'weather__wind'}
            >
                18&#176;
            </WeatherCard>

            <WeatherCard
                faIcon={'fa-solid fa-gauge-high'}
                title={'Pressure'}
                valueClass={'weather__pressure'}
            >
                18&#176;
            </WeatherCard>
        </div>
    );
}
