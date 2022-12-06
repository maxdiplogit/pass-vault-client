const Password = (props) => {
    return (
        <>
            <li>
                <div>
                    <h2>{ props.service.service }</h2>
                </div>
                <div>
                    <h2>{ props.service.password }</h2>
                </div>
            </li>
        </>
    );
};


export default Password;