function Card({
    label,
    icon,
    value
}) {
    return (
        <div className='h-fit w-fit flex flex-col gap-4 justify-center items-center'>
            {/* <h1>{label}</h1> */}
            <img className='h-8 w-8' src={icon}></img>
            <h1>{value}</h1>
        </div>
    );
}

export default Card;