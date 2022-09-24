import "../Styles/Greeting.css";
import "../Styles/Fonts.css";

function Dialog({ header, option1, option2, children, height }) {
    return (

        <div id='greeting' style={{height:height}}>
            <h2 style={{ textAlign: 'center' }}>{header}</h2>
            {option1 == null ? null : <div id='options'>
                <div className="option"><a href='create'>{option1}</a></div>
                <div className="option"><a href='view'>{option2}</a></div>
            </div>}
            {children}
        </div>

    )
}
export default Dialog;