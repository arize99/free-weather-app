export default function WeatherCard(props) {
    const faIcon = props.faIcon;
    const title = props.title;
    const valueClass = props.valueClass;
    const value = props.children;

    return (
        <div className='weather__card'>
            <i className={faIcon}></i>
            <div>
                <p>{title}</p>
                <p className={valueClass}>{value}</p>
            </div>
        </div>
    );
}
